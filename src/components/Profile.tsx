'use client';

import LoadingIndicator from './LoadingIndicator';
import { css } from '@linaria/core';
import { useMemo } from 'react';
import { RACES, useDnD5eAllRaces, useDnD5eRace, useDnD5eSubrace, useDnD5eRacesProficiencies, useDnD5eRacesTraits } from '@/services/hooks/useDnD5eRaces';
import { CLASSES, useDnD5eClasses, useDnD5eClass } from '@/services/hooks/useDnD5eClasses';
import { useOpen5eBackgrounds, getSuggestedCharacteristics } from '@/services/hooks/useOpen5eBackgrounds';
import getRandomArrayIndex from '@/utils/getRandomArrayIndex';

const ABILITIES = [
  { key: 'Strength', abbreviation: 'STR' },
  { key: 'Dexterity', abbreviation: 'DEX' },
  { key: 'Constitution', abbreviation: 'CON' },
  { key: 'Intelligence', abbreviation: 'INT' },
  { key: 'Wisdom', abbreviation: 'WIS' },
  { key: 'Charisma', abbreviation: 'CHA' },
] as const;

type AbilityKey = (typeof ABILITIES)[number]['key'];

const SAVE_ORDER = [
  { key: 'Strength', abbreviation: 'STR' },
  { key: 'Dexterity', abbreviation: 'DEX' },
  { key: 'Constitution', abbreviation: 'CON' },
  { key: 'Wisdom', abbreviation: 'WIS' },
  { key: 'Intelligence', abbreviation: 'INT' },
  { key: 'Charisma', abbreviation: 'CHA' },
] as const satisfies { key: AbilityKey; abbreviation: string }[];

const SKILLS = [
  { name: 'Acrobatics', ability: 'Dexterity', abbreviation: 'Dex' },
  { name: 'Animal Handling', ability: 'Wisdom', abbreviation: 'Wis' },
  { name: 'Arcana', ability: 'Intelligence', abbreviation: 'Int' },
  { name: 'Athletics', ability: 'Strength', abbreviation: 'Str' },
  { name: 'Deception', ability: 'Charisma', abbreviation: 'Cha' },
  { name: 'History', ability: 'Intelligence', abbreviation: 'Int' },
  { name: 'Insight', ability: 'Wisdom', abbreviation: 'Wis' },
  { name: 'Intimidation', ability: 'Charisma', abbreviation: 'Cha' },
  { name: 'Investigation', ability: 'Intelligence', abbreviation: 'Int' },
  { name: 'Medicine', ability: 'Wisdom', abbreviation: 'Wis' },
  { name: 'Nature', ability: 'Intelligence', abbreviation: 'Int' },
  { name: 'Perception', ability: 'Wisdom', abbreviation: 'Wis' },
  { name: 'Performance', ability: 'Charisma', abbreviation: 'Cha' },
  { name: 'Persuasion', ability: 'Charisma', abbreviation: 'Cha' },
  { name: 'Religion', ability: 'Intelligence', abbreviation: 'Int' },
  { name: 'Sleight of Hand', ability: 'Dexterity', abbreviation: 'Dex' },
  { name: 'Stealth', ability: 'Dexterity', abbreviation: 'Dex' },
  { name: 'Survival', ability: 'Wisdom', abbreviation: 'Wis' },
] as const satisfies { name: string; ability: AbilityKey; abbreviation: string }[];

const PROFICIENCY_BONUS = 2;

function rollAbilityScore(): number {
  const rolls = Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 6)).sort((a, b) => b - a);
  return rolls[0] + rolls[1] + rolls[2];
}

function formatSigned(value: number): string {
  return value >= 0 ? `+${String(value)}` : String(value);
}

function pickRandomSubset<T>(items: readonly T[], count: number): T[] {
  const pool = [...items];
  const picked: T[] = [];
  while (pool.length > 0 && picked.length < count) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}

export default function Profile() {
  // Picked once per mount so the generated character stays stable across
  // re-renders; reloading the page rolls a new one, same as the old random-species hook.
  const raceIndex = useMemo(() => getRandomArrayIndex(RACES), []);
  const classIndex = useMemo(() => getRandomArrayIndex(CLASSES), []);

  const { data: DnD5eRacesData } = useDnD5eAllRaces();
  const { data: DnD5eRaceData, error: raceError, isLoading: isLoadingRace } = useDnD5eRace(raceIndex);
  const { data: DnD5eSubraceData } = useDnD5eSubrace(raceIndex);
  const { data: DnD5eRacesProficienciesData } = useDnD5eRacesProficiencies(raceIndex);
  const { data: DnD5eRacesTraitsData } = useDnD5eRacesTraits(raceIndex);

  const { data: DnD5eClassesData } = useDnD5eClasses();
  const { data: DnD5eClassData, error: classError, isLoading: isLoadingClass } = useDnD5eClass(classIndex);

  const { data: Open5eBackgroundsData, error: backgroundsError, isLoading: isLoadingBackgrounds } = useOpen5eBackgrounds();

  const subrace = useMemo(() => {
    if (!DnD5eSubraceData?.results?.length) {
      return undefined;
    }
    return getRandomArrayIndex(DnD5eSubraceData.results);
  }, [DnD5eSubraceData]);

  // Only ~20 of Open5e's 58 backgrounds carry parseable Personality/Ideal/Bond/Flaw
  // tables (the rest just point back at the PHB in prose), so the random pick is
  // scoped to that usable subset rather than the full pool.
  const background = useMemo(() => {
    const usable = Open5eBackgroundsData?.results.filter((candidate) => !!getSuggestedCharacteristics(candidate));
    return usable?.length ? getRandomArrayIndex(usable) : undefined;
  }, [Open5eBackgroundsData]);

  const characteristics = useMemo(() => (background ? getSuggestedCharacteristics(background) : undefined), [background]);

  const personalityPick = useMemo(() => (characteristics ? getRandomArrayIndex(characteristics.personalityTraits) : undefined), [characteristics]);
  const idealPick = useMemo(() => (characteristics ? getRandomArrayIndex(characteristics.ideals) : undefined), [characteristics]);
  const bondPick = useMemo(() => (characteristics ? getRandomArrayIndex(characteristics.bonds) : undefined), [characteristics]);
  const flawPick = useMemo(() => (characteristics ? getRandomArrayIndex(characteristics.flaws) : undefined), [characteristics]);

  const abilityScores = useMemo(() => {
    const bonusByAbbreviation = new Map<string, number>();
    DnD5eRaceData?.ability_bonuses.forEach((bonus) => {
      const abbreviation = bonus?.ability_score?.name;
      if (abbreviation && bonus.bonus != null) {
        bonusByAbbreviation.set(abbreviation, (bonusByAbbreviation.get(abbreviation) ?? 0) + bonus.bonus);
      }
    });

    return ABILITIES.reduce(
      (scores, { key, abbreviation }) => {
        const score = rollAbilityScore() + (bonusByAbbreviation.get(abbreviation) ?? 0);
        const modifier = Math.floor((score - 10) / 2);
        scores[key] = { score, modifier };
        return scores;
      },
      {} as Record<AbilityKey, { score: number; modifier: number }>
    );
  }, [DnD5eRaceData]);

  const proficientSaves = useMemo(() => new Set(DnD5eClassData?.saving_throws?.map((save) => save.name).filter((name): name is string => !!name)), [DnD5eClassData]);

  const proficientSkills = useMemo(() => {
    const proficient = new Set<string>();
    DnD5eClassData?.proficiency_choices
      ?.filter((choice) => choice.type === 'proficiencies')
      .forEach((choice) => {
        const skillOptions = (choice.from?.options ?? [])
          .map((option) => option.item?.name)
          .filter((name): name is string => !!name && name.startsWith('Skill: '))
          .map((name) => name.replace('Skill: ', ''));
        pickRandomSubset(skillOptions, choice.choose ?? 0).forEach((name) => proficient.add(name));
      });
    return proficient;
  }, [DnD5eClassData]);

  if (isLoadingRace || isLoadingClass || isLoadingBackgrounds) {
    return <LoadingIndicator />;
  }

  const loadError = raceError ?? classError ?? backgroundsError;
  if (loadError || !DnD5eRaceData || !DnD5eClassData) {
    return (
      <div className="">
        <p>Error loading character data: {loadError?.message ?? 'No data.'}</p>
      </div>
    );
  }

  const raceLabel = subrace?.name ? `${DnD5eRaceData.name ?? ''} (${subrace.name})` : (DnD5eRaceData.name ?? '');
  const classLevelLabel = DnD5eClassData.name ? `${DnD5eClassData.name} 1` : '';

  const backgroundBenefit = (type: string) => background?.benefits.find((benefit) => benefit.type === type)?.desc ?? undefined;
  const backgroundSkillProficiency = backgroundBenefit('skill_proficiency');
  const backgroundToolProficiency = backgroundBenefit('tool_proficiency');
  const backgroundEquipment = backgroundBenefit('equipment');

  const otherProfsText = [
    DnD5eRacesProficienciesData?.results?.length ? `Race: ${DnD5eRacesProficienciesData.results.map((prof) => prof.name).join(', ')}` : undefined,
    DnD5eRaceData.language_desc,
    DnD5eClassData.proficiencies?.length
      ? `Class: ${DnD5eClassData.proficiencies
          .map((prof) => prof.name)
          .filter((name): name is string => !!name && !name.toLowerCase().startsWith('saving throw'))
          .join(', ')}`
      : undefined,
    backgroundSkillProficiency ? `Background skills: ${backgroundSkillProficiency}` : undefined,
    backgroundToolProficiency ? `Background tools: ${backgroundToolProficiency}` : undefined,
  ]
    .filter((section): section is string => !!section)
    .join('\n\n');

  const equipmentText = [
    DnD5eClassData.starting_equipment?.length ? DnD5eClassData.starting_equipment.map((item) => `${item.quantity && item.quantity > 1 ? `${String(item.quantity)}x ` : ''}${item.equipment?.name ?? ''}`).join(', ') : undefined,
    ...(DnD5eClassData.starting_equipment_options?.map((option) => option.desc).filter((desc): desc is string => !!desc) ?? []),
    backgroundEquipment,
  ]
    .filter((line): line is string => !!line)
    .join('\n');

  const featuresText = [
    ...(DnD5eRacesTraitsData?.results?.map((trait) => trait.name).filter((name): name is string => !!name) ?? []),
    subrace?.name ? `Subrace: ${subrace.name}` : undefined,
    ...(background?.benefits.filter((benefit) => benefit.type === 'feature' && benefit.name && benefit.desc).map((benefit) => `${benefit.name ?? ''}: ${benefit.desc ?? ''}`) ?? []),
  ]
    .filter((line): line is string => !!line)
    .join('\n');

  const spellcastingAbilityAbbreviation = DnD5eClassData.spellcasting?.spellcasting_ability?.name;
  const spellcastingAbility = ABILITIES.find((ability) => ability.abbreviation === spellcastingAbilityAbbreviation);
  const spellcastingText = spellcastingAbility
    ? `Spellcasting Ability: ${spellcastingAbility.key} | Spell Save DC: ${String(8 + PROFICIENCY_BONUS + abilityScores[spellcastingAbility.key].modifier)} | Spell Attack: ${formatSigned(PROFICIENCY_BONUS + abilityScores[spellcastingAbility.key].modifier)}`
    : undefined;

  const hitDie = DnD5eClassData.hit_die ?? 8;
  const maxHp = Math.max(1, hitDie + abilityScores.Constitution.modifier);

  return (
    <div className={CharSheet}>
      <form className="charsheet">
        <header>
          <section className="charname">
            <label htmlFor="charname">Character Name</label>
            <input name="charname" placeholder="Thoradin Fireforge" />
          </section>
          <section className="misc">
            <ul>
              <li>
                <label htmlFor="classlevel">Class & Level</label>
                <input name="classlevel" placeholder="Paladin 2" defaultValue={classLevelLabel} list="class-options" />
                {!!DnD5eClassesData?.results?.length && (
                  <datalist id="class-options">
                    {DnD5eClassesData.results.map((klass) => (
                      <option key={klass.index ?? klass.name} value={klass.name ?? ''} />
                    ))}
                  </datalist>
                )}
              </li>
              <li>
                <label htmlFor="background">Background</label>
                <input name="background" placeholder="Acolyte" defaultValue={background?.name ?? ''} />
              </li>
              <li>
                <label htmlFor="playername">Player Name</label>
                <input name="playername" placeholder="Player McPlayerface" />
              </li>
              <li>
                <label htmlFor="race">Race</label>
                <input name="race" placeholder="Half-elf" defaultValue={raceLabel} list="race-options" />
                {!!DnD5eRacesData?.results?.length && (
                  <datalist id="race-options">
                    {DnD5eRacesData.results.map((race) => (
                      <option key={race.index ?? race.name} value={race.name ?? ''} />
                    ))}
                  </datalist>
                )}
              </li>
              <li>
                <label htmlFor="alignment">Alignment</label>
                <input name="alignment" placeholder="Lawful Good" defaultValue={DnD5eRaceData.alignment ?? ''} />
              </li>
              <li>
                <label htmlFor="experiencepoints">Experience Points</label>
                <input name="experiencepoints" placeholder="3240" />
              </li>
            </ul>
          </section>
        </header>
        <main>
          <section>
            <section className="attributes">
              <div className="scores">
                <ul>
                  <li>
                    <div className="score">
                      <label htmlFor="Strengthscore">Strength</label>
                      <input name="Strengthscore" placeholder="10" defaultValue={abilityScores.Strength.score} />
                    </div>
                    <div className="modifier">
                      <input name="Strengthmod" placeholder="+0" defaultValue={formatSigned(abilityScores.Strength.modifier)} />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Dexterityscore">Dexterity</label>
                      <input name="Dexterityscore" placeholder="10" defaultValue={abilityScores.Dexterity.score} />
                    </div>
                    <div className="modifier">
                      <input name="Dexteritymod" placeholder="+0" defaultValue={formatSigned(abilityScores.Dexterity.modifier)} />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Constitutionscore">Constitution</label>
                      <input name="Constitutionscore" placeholder="10" defaultValue={abilityScores.Constitution.score} />
                    </div>
                    <div className="modifier">
                      <input name="Constitutionmod" placeholder="+0" defaultValue={formatSigned(abilityScores.Constitution.modifier)} />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Wisdomscore">Wisdom</label>
                      <input name="Wisdomscore" placeholder="10" defaultValue={abilityScores.Wisdom.score} />
                    </div>
                    <div className="modifier">
                      <input name="Wisdommod" placeholder="+0" defaultValue={formatSigned(abilityScores.Wisdom.modifier)} />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Intelligencescore">Intelligence</label>
                      <input name="Intelligencescore" placeholder="10" defaultValue={abilityScores.Intelligence.score} />
                    </div>
                    <div className="modifier">
                      <input name="Intelligencemod" placeholder="+0" defaultValue={formatSigned(abilityScores.Intelligence.modifier)} />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Charismascore">Charisma</label>
                      <input name="Charismascore" placeholder="10" defaultValue={abilityScores.Charisma.score} />
                    </div>
                    <div className="modifier">
                      <input name="Charismamod" placeholder="+0" defaultValue={formatSigned(abilityScores.Charisma.modifier)} />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="attr-applications">
                <div className="inspiration box">
                  <div className="label-container">
                    <label htmlFor="inspiration">Inspiration</label>
                  </div>
                  <input name="inspiration" type="checkbox" />
                </div>
                <div className="proficiencybonus box">
                  <div className="label-container">
                    <label htmlFor="proficiencybonus">Proficiency Bonus</label>
                  </div>
                  <input name="proficiencybonus" placeholder="+2" defaultValue="+2" />
                </div>
                <div className="saves list-section box">
                  <ul>
                    {SAVE_ORDER.map(({ key, abbreviation }) => {
                      const proficient = proficientSaves.has(abbreviation);
                      const value = abilityScores[key].modifier + (proficient ? PROFICIENCY_BONUS : 0);
                      return (
                        <li key={key}>
                          <label htmlFor={`${key}-save`}>{key}</label>
                          <input name={`${key}-save`} placeholder="+0" type="text" defaultValue={formatSigned(value)} />
                          <input name={`${key}-save-prof`} type="checkbox" defaultChecked={proficient} />
                        </li>
                      );
                    })}
                  </ul>
                  <div className="label">Saving Throws</div>
                </div>
                <div className="skills list-section box">
                  <ul>
                    {SKILLS.map((skill) => {
                      const proficient = proficientSkills.has(skill.name);
                      const value = abilityScores[skill.ability].modifier + (proficient ? PROFICIENCY_BONUS : 0);
                      return (
                        <li key={skill.name}>
                          <label htmlFor={skill.name}>
                            {skill.name} <span className="skill">({skill.abbreviation})</span>
                          </label>
                          <input name={skill.name} placeholder="+0" type="text" defaultValue={formatSigned(value)} />
                          <input name={`${skill.name}-prof`} type="checkbox" defaultChecked={proficient} />
                        </li>
                      );
                    })}
                  </ul>
                  <div className="label">Skills</div>
                </div>
              </div>
            </section>
            <div className="passive-perception box">
              <div className="label-container">
                <label htmlFor="passiveperception">Passive Wisdom (Perception)</label>
              </div>
              <input name="passiveperception" placeholder="10" defaultValue={10 + abilityScores.Wisdom.modifier + (proficientSkills.has('Perception') ? PROFICIENCY_BONUS : 0)} />
            </div>
            <div className="otherprofs box textblock">
              <label htmlFor="otherprofs">Other Proficiencies and Languages</label>
              <textarea name="otherprofs" defaultValue={otherProfsText}></textarea>
            </div>
          </section>
          <section>
            <section className="combat">
              <div className="armorclass">
                <div>
                  <label htmlFor="ac">Armor Class</label>
                  <input name="ac" placeholder="10" type="text" defaultValue={10 + abilityScores.Dexterity.modifier} />
                </div>
              </div>
              <div className="initiative">
                <div>
                  <label htmlFor="initiative">Initiative</label>
                  <input name="initiative" placeholder="+0" type="text" defaultValue={formatSigned(abilityScores.Dexterity.modifier)} />
                </div>
              </div>
              <div className="speed">
                <div>
                  <label htmlFor="speed">Speed</label>
                  <input name="speed" placeholder="30" type="text" defaultValue={DnD5eRaceData.speed} />
                </div>
              </div>
              <div className="hp">
                <div className="regular">
                  <div className="max">
                    <label htmlFor="maxhp">Hit Point Maximum</label>
                    <input name="maxhp" placeholder="10" type="text" defaultValue={maxHp} />
                  </div>
                  <div className="current">
                    <label htmlFor="currenthp">Current Hit Points</label>
                    <input name="currenthp" type="text" defaultValue={maxHp} />
                  </div>
                </div>
                <div className="temporary">
                  <label htmlFor="temphp">Temporary Hit Points</label>
                  <input name="temphp" type="text" />
                </div>
              </div>
              <div className="hitdice">
                <div>
                  <div className="total">
                    <label htmlFor="totalhd">Total</label>
                    <input name="totalhd" placeholder="2d10" type="text" defaultValue={`1d${String(hitDie)}`} />
                  </div>
                  <div className="remaining">
                    <label htmlFor="remaininghd">Hit Dice</label>
                    <input name="remaininghd" type="text" defaultValue="1" />
                  </div>
                </div>
              </div>
              <div className="deathsaves">
                <div>
                  <div className="label">
                    <label>Death Saves</label>
                  </div>
                  <div className="marks">
                    <div className="deathsuccesses">
                      <label>Successes</label>
                      <div className="bubbles">
                        <input name="deathsuccess1" type="checkbox" />
                        <input name="deathsuccess2" type="checkbox" />
                        <input name="deathsuccess3" type="checkbox" />
                      </div>
                    </div>
                    <div className="deathfails">
                      <label>Failures</label>
                      <div className="bubbles">
                        <input name="deathfail1" type="checkbox" />
                        <input name="deathfail2" type="checkbox" />
                        <input name="deathfail3" type="checkbox" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="attacksandspellcasting">
              <div>
                <label>Attacks & Spellcasting</label>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Atk Bonus</th>
                      <th>Damage/Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input name="atkname1" type="text" />
                      </td>
                      <td>
                        <input name="atkbonus1" type="text" />
                      </td>
                      <td>
                        <input name="atkdamage1" type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input name="atkname2" type="text" />
                      </td>
                      <td>
                        <input name="atkbonus2" type="text" />
                      </td>
                      <td>
                        <input name="atkdamage2" type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input name="atkname3" type="text" />
                      </td>
                      <td>
                        <input name="atkbonus3" type="text" />
                      </td>
                      <td>
                        <input name="atkdamage3" type="text" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <textarea defaultValue={spellcastingText}></textarea>
              </div>
            </section>
            <section className="equipment">
              <div>
                <label>Equipment</label>
                <div className="money">
                  <ul>
                    <li>
                      <label htmlFor="cp">cp</label>
                      <input name="cp" />
                    </li>
                    <li>
                      <label htmlFor="sp">sp</label>
                      <input name="sp" />
                    </li>
                    <li>
                      <label htmlFor="ep">ep</label>
                      <input name="ep" />
                    </li>
                    <li>
                      <label htmlFor="gp">gp</label>
                      <input name="gp" />
                    </li>
                    <li>
                      <label htmlFor="pp">pp</label>
                      <input name="pp" />
                    </li>
                  </ul>
                </div>
                <textarea placeholder="Equipment list here" defaultValue={equipmentText}></textarea>
              </div>
            </section>
          </section>
          <section>
            <section className="flavor">
              <div className="personality">
                <label htmlFor="personality">Personality</label>
                <textarea name="personality" defaultValue={personalityPick}></textarea>
              </div>
              <div className="ideals">
                <label htmlFor="ideals">Ideals</label>
                <textarea name="ideals" defaultValue={idealPick}></textarea>
              </div>
              <div className="bonds">
                <label htmlFor="bonds">Bonds</label>
                <textarea name="bonds" defaultValue={bondPick}></textarea>
              </div>
              <div className="flaws">
                <label htmlFor="flaws">Flaws</label>
                <textarea name="flaws" defaultValue={flawPick}></textarea>
              </div>
            </section>
            <section className="features">
              <div>
                <label htmlFor="features">Features & Traits</label>
                <textarea name="features" defaultValue={featuresText}></textarea>
              </div>
            </section>
          </section>
        </main>
      </form>
    </div>
  );
}

const CharSheet = css`
  --sheet-width: 800px;
  --bg: white;
  --faded: #ddd;
  --faded-light: #eee;
  --faded-dark: #bbb;
  --radius: 10px;
  --gutter: 10px;
  --bubble-size: 10px;
  --small-box-width: 30px;
  --large-box-width: 70px;

  .red {
    background: red;
  }

  .blue {
    background: blue;
  }

  .hide {
    display: none !important;
  }

  textarea {
    font-size: 12px;
    text-align: left;
    width: calc(100% - 20px - 2px);
    border-radius: 10px;
    padding: 10px;
    resize: none;
    overflow: hidden;
    height: 15em;
  }

  input[type='checkbox'] {
    cursor: pointer;
  }

  div.box {
    margin-top: 10px;
  }

  form.charsheet {
    width: 800px;
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
  }
  form.charsheet div.textblock {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    align-items: center;
  }
  form.charsheet div.textblock label {
    text-align: center;
    border: 1px solid black;
    border-top: 0;
    font-size: 10px;
    width: calc(100% - 20px - 2px);
    border-radius: 0 0 10px 10px;
    padding: 4px 0;
    font-weight: bold;
  }
  form.charsheet div.textblock textarea {
    border: 1px solid black;
  }
  form.charsheet ul {
    margin: 0;
    padding: 0;
  }
  form.charsheet ul li {
    list-style-image: none;
    display: block;
  }
  form.charsheet ::-moz-placeholder {
    color: #bbb;
  }
  form.charsheet :-ms-input-placeholder {
    color: #bbb;
  }
  form.charsheet ::placeholder {
    color: #bbb;
  }
  form.charsheet label {
    text-transform: uppercase;
    font-size: 12px;
  }
  form.charsheet header {
    display: flex;
    align-contents: stretch;
    align-items: stretch;
  }
  form.charsheet header section.charname {
    border: 1px solid black;
    border-right: 0;
    border-radius: 10px 0 0 10px;
    padding: 5px 0;
    background-color: #eee;
    width: 30%;
    display: flex;
    flex-direction: column-reverse;
    bottom: 0;
    top: 0;
    margin: auto;
  }
  form.charsheet header section.charname input {
    padding: 0.5em;
    margin: 5px;
    border: 0;
  }
  form.charsheet header section.charname label {
    padding-left: 1em;
  }
  form.charsheet header section.misc {
    width: 70%;
    border: 1px solid black;
    border-radius: 10px;
    padding-left: 1em;
    padding-right: 1em;
  }
  form.charsheet header section.misc ul {
    padding: 10px 0px 5px 0px;
    display: flex;
    flex-wrap: wrap;
  }
  form.charsheet header section.misc ul li {
    width: 33.33333%;
    display: flex;
    flex-direction: column-reverse;
  }
  form.charsheet header section.misc ul li label {
    margin-bottom: 5px;
  }
  form.charsheet header section.misc ul li input {
    border: 0;
    border-bottom: 1px solid #ddd;
  }
  form.charsheet main {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  form.charsheet main div.label-container {
    position: relative;
    width: 100%;
    height: 18px;
    margin-top: 6px;
    border: 1px solid black;
    border-left: 0;
    text-align: center;
  }
  form.charsheet main div.label-container > label {
    position: absolute;
    left: 0;
    top: 1px;
    transform: translate(0%, 50%);
    width: 100%;
    font-size: 8px;
  }
  form.charsheet main > section {
    width: 32%;
    display: flex;
    flex-direction: column;
  }
  form.charsheet main > section section.attributes {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  form.charsheet main > section section.attributes div.scores {
    width: 101px;
    background-color: #bbb;
    border-radius: 10px;
    padding-bottom: 5px;
  }
  form.charsheet main > section section.attributes div.scores label {
    font-size: 8px;
    font-weight: bold;
  }
  form.charsheet main > section section.attributes div.scores ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }
  form.charsheet main > section section.attributes div.scores ul li {
    height: 80px;
    width: 70px;
    background-color: white;
    border: 1px solid black;
    text-align: center;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  }
  form.charsheet main > section section.attributes div.scores ul li input {
    width: 100%;
    padding: 0;
    border: 0;
  }
  form.charsheet main > section section.attributes div.scores ul li div.score input {
    text-align: center;
    font-size: 40px;
    padding: 2px 0px 0px 0px;
    background: white;
  }
  form.charsheet main > section section.attributes div.scores ul li div.modifier {
    margin-top: 3px;
  }
  form.charsheet main > section section.attributes div.scores ul li div.modifier input {
    background: white;
    width: 30px;
    height: 20px;
    border: 1px inset black;
    border-radius: 20px;
    margin: -1px;
    text-align: center;
  }
  form.charsheet main > section section.attributes div.attr-applications div.inspiration {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
  form.charsheet main > section section.attributes div.attr-applications div.inspiration input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid black;
    padding: 15px;
    border-radius: 10px;
  }
  form.charsheet main > section section.attributes div.attr-applications div.proficiencybonus {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
  form.charsheet main > section section.attributes div.attr-applications div.proficiencybonus input {
    width: 30px;
    height: 28px;
    border: 1px solid black;
    text-align: center;
    border-radius: 10px;
  }
  form.charsheet main > section section.attributes div.attr-applications div.list-section {
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px 5px;
  }
  form.charsheet main > section section.attributes div.attr-applications div.list-section div.label {
    margin-top: 10px;
    margin-bottom: 2.5px;
    text-align: center;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
  }
  form.charsheet main > section section.attributes div.attr-applications div.list-section ul li {
    display: flex;
    align-items: center;
  }
  form.charsheet main > section section.attributes div.attr-applications div.list-section ul li > * {
    margin-left: 5px;
  }
  form.charsheet main > section section.attributes div.attr-applications div.list-section ul li label {
    text-transform: none;
    font-size: 8px;
    text-align: left;
    order: 3;
  }
  form.charsheet main > section section.attributes div.attr-applications div.list-section ul li label span.skill {
    color: #bbb;
  }
  form.charsheet main > section section.attributes div.attr-applications div.list-section ul li input[type='text'] {
    width: 30px;
    font-size: 12px;
    text-align: center;
    border: 0;
    border-bottom: 1px solid black;
    order: 2;
  }
  form.charsheet main > section section.attributes div.attr-applications div.list-section ul li input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border: 1px solid black;
    border-radius: 10px;
    order: 1;
  }
  form.charsheet main > section section.attributes div.attr-applications div.list-section ul li input[type='checkbox']:checked {
    background-color: black;
  }
  form.charsheet main > section div.passive-perception {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
  form.charsheet main > section div.passive-perception input {
    width: 30px;
    height: 28px;
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;
  }
  form.charsheet main > section div.otherprofs textarea {
    height: 26em;
  }
  form.charsheet main section.combat {
    background-color: #eee;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
  }
  form.charsheet main section.combat > div {
    overflow: hidden;
  }
  form.charsheet main section.combat > div.armorclass,
  form.charsheet main section.combat > div.initiative,
  form.charsheet main section.combat > div.speed {
    flex-basis: 33.333%;
  }
  form.charsheet main section.combat > div.armorclass > div,
  form.charsheet main section.combat > div.initiative > div,
  form.charsheet main section.combat > div.speed > div {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 10px;
  }
  form.charsheet main section.combat > div.armorclass > div label,
  form.charsheet main section.combat > div.initiative > div label,
  form.charsheet main section.combat > div.speed > div label {
    font-size: 8px;
    width: 50px;
    border: 1px solid black;
    border-top: 0;
    background-color: white;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 0 0 10px 10px;
  }
  form.charsheet main section.combat > div.armorclass > div input,
  form.charsheet main section.combat > div.initiative > div input,
  form.charsheet main section.combat > div.speed > div input {
    height: 70px;
    width: 70px;
    border-radius: 10px;
    border: 1px solid black;
    text-align: center;
    font-size: 30px;
  }
  form.charsheet main section.combat > div.hp {
    flex-basis: 100%;
  }
  form.charsheet main section.combat > div.hp > div.regular {
    background-color: white;
    border: 1px solid black;
    margin: 10px;
    margin-bottom: 5px;
    border-radius: 10px 10px 0 0;
  }
  form.charsheet main section.combat > div.hp > div.regular > div.max {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
  }
  form.charsheet main section.combat > div.hp > div.regular > div.max label {
    font-size: 10px;
    text-transform: none;
    color: #bbb;
  }
  form.charsheet main section.combat > div.hp > div.regular > div.max input {
    width: 40%;
    border: 0;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    text-align: center;
  }
  form.charsheet main section.combat > div.hp > div.regular > div.current {
    display: flex;
    flex-direction: column-reverse;
  }
  form.charsheet main section.combat > div.hp > div.regular > div.current input {
    border: 0;
    width: 100%;
    padding: 1em 0;
    font-size: 20px;
    text-align: center;
  }
  form.charsheet main section.combat > div.hp > div.regular > div.current label {
    font-size: 10px;
    padding-bottom: 5px;
    text-align: center;
    font-weight: bold;
  }
  form.charsheet main section.combat > div.hp > div.temporary {
    margin: 10px;
    margin-top: 0;
    border: 1px solid black;
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column-reverse;
    background-color: white;
  }
  form.charsheet main section.combat > div.hp > div.temporary input {
    padding: 1em 0;
    font-size: 20px;
    border: 0;
    text-align: center;
  }
  form.charsheet main section.combat > div.hp > div.temporary label {
    font-size: 10px;
    padding-bottom: 5px;
    text-align: center;
    font-weight: bold;
  }
  form.charsheet main section.combat > div.hitdice,
  form.charsheet main section.combat > div.deathsaves {
    flex: 1 50%;
    height: 100px;
  }
  form.charsheet main section.combat > div.hitdice > div,
  form.charsheet main section.combat > div.deathsaves > div {
    height: 80px;
  }
  form.charsheet main section.combat > div.hitdice > div {
    background-color: white;
    margin: 10px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  form.charsheet main section.combat > div.hitdice > div > div.total {
    display: flex;
    align-items: baseline;
    justify-content: space-around;
    padding: 5px 0;
  }
  form.charsheet main section.combat > div.hitdice > div > div.total label {
    font-size: 10px;
    color: #bbb;
    margin: 0.25em;
    text-transform: none;
  }
  form.charsheet main section.combat > div.hitdice > div > div.total input {
    font-size: 12px;
    flex-grow: 1;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 50%;
    margin-right: 0.25em;
    padding: 0 0.25em;
    text-align: center;
  }
  form.charsheet main section.combat > div.hitdice > div > div.remaining {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
  }
  form.charsheet main section.combat > div.hitdice > div > div.remaining label {
    text-align: center;
    padding: 2px;
    font-size: 10px;
  }
  form.charsheet main section.combat > div.hitdice > div > div.remaining input {
    text-align: center;
    border: 0;
    flex: 1;
  }
  form.charsheet main section.combat > div.deathsaves > div {
    margin: 10px;
    background: white;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column-reverse;
  }
  form.charsheet main section.combat > div.deathsaves > div > div.label {
    text-align: center;
  }
  form.charsheet main section.combat > div.deathsaves > div > div.label label {
    font-size: 10px;
  }
  form.charsheet main section.combat > div.deathsaves > div > div.marks {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
  }
  form.charsheet main section.combat > div.deathsaves > div > div.marks div.deathsuccesses,
  form.charsheet main section.combat > div.deathsaves > div > div.marks div.deathfails {
    display: flex;
    align-items: center;
  }
  form.charsheet main section.combat > div.deathsaves > div > div.marks div.deathsuccesses label,
  form.charsheet main section.combat > div.deathsaves > div > div.marks div.deathfails label {
    font-size: 8px;
    text-align: right;
    flex: 1 50%;
  }
  form.charsheet main section.combat > div.deathsaves > div div.bubbles {
    flex: 1 40%;
    margin-left: 5px;
  }
  form.charsheet main section.combat > div.deathsaves > div div.bubbles input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border: 1px solid black;
    border-radius: 10px;
  }
  form.charsheet main section.combat > div.deathsaves > div div.bubbles input[type='checkbox']:checked {
    background-color: black;
  }
  form.charsheet main section.attacksandspellcasting {
    border: 1px solid black;
    border-radius: 10px;
    margin-top: 10px;
  }
  form.charsheet main section.attacksandspellcasting > div {
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  form.charsheet main section.attacksandspellcasting > div > label {
    order: 3;
    text-align: center;
  }
  form.charsheet main section.attacksandspellcasting > div > table {
    width: 100%;
  }
  form.charsheet main section.attacksandspellcasting > div > table th {
    font-size: 10px;
    color: #ddd;
  }
  form.charsheet main section.attacksandspellcasting > div > table input {
    width: calc(100% - 4px);
    border: 0;
    background-color: #eee;
    font-size: 10px;
    padding: 3px;
  }
  form.charsheet main section.attacksandspellcasting > div textarea {
    border: 0;
  }
  form.charsheet main section.equipment {
    border: 1px solid black;
    border-radius: 10px;
    margin-top: 10px;
  }
  form.charsheet main section.equipment > div {
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  form.charsheet main section.equipment > div > div.money ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  form.charsheet main section.equipment > div > div.money ul > li {
    display: flex;
    align-items: center;
  }
  form.charsheet main section.equipment > div > div.money ul > li label {
    border: 1px solid black;
    border-radius: 10px 0 0 10px;
    border-right: 0;
    width: 20px;
    font-size: 8px;
    text-align: center;
    padding: 3px 0;
  }
  form.charsheet main section.equipment > div > div.money ul > li input {
    border: 1px solid black;
    border-radius: 10px;
    width: 40px;
    padding: 10px 3px;
    font-size: 12px;
    text-align: center;
  }
  form.charsheet main section.equipment > div > label {
    order: 3;
    text-align: center;
    flex: 100%;
  }
  form.charsheet main section.equipment > div > textarea {
    flex: 1;
    border: 0;
  }
  form.charsheet main section.flavor {
    padding: 10px;
    background: #bbb;
    border-radius: 10px;
  }
  form.charsheet main section.flavor div {
    background: white;
    display: flex;
    flex-direction: column-reverse;
    padding: 5px;
    border: 1px solid black;
  }
  form.charsheet main section.flavor div label {
    text-align: center;
    font-size: 10px;
    margin-top: 3px;
  }
  form.charsheet main section.flavor div textarea {
    border: 0;
    border-radius: 0;
    height: 4em;
  }
  form.charsheet main section.flavor div:first-child {
    border-radius: 10px 10px 0 0;
  }
  form.charsheet main section.flavor div:not(:first-child) {
    margin-top: 10px;
  }
  form.charsheet main section.flavor div:last-child {
    border-radius: 0 0 10px 10px;
  }
  form.charsheet main section.features {
    padding: 10px;
  }
  form.charsheet main section.features div {
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column-reverse;
  }
  form.charsheet main section.features div label {
    text-align: center;
  }
  form.charsheet main section.features div textarea {
    border: 0;
    padding: 5px;
    height: 43em;
  }
`;
