'use client';

import useRandom5eSpecies from '@/services/hooks/useRandom5eSpecies';
import LoadingIndicator from './LoadingIndicator';
import { css } from '@linaria/core';
import { useDnD5eAllRaces, useDnD5eRace, useDnD5eSubrace, useDnD5eRacesProficiencies, useDnD5eRacesTraits } from '@/services/hooks/useDnD5eRaces';

export default function Profile() {
  const { data: Random5eSpeciesData, error: Random5eSpeciesError, isLoading: isLoadingRandom5eSpecies } = useRandom5eSpecies();
  const { data: DnD5eRacesData } = useDnD5eAllRaces();
  const { data: DnD5eRaceData } = useDnD5eRace('dragonborn');
  const { data: DnD5eSubraceData } = useDnD5eSubrace('elf');
  const { data: DnD5eRacesProficienciesData } = useDnD5eRacesProficiencies('dwarf');
  const { data: DnD5eRacesTraitsData } = useDnD5eRacesTraits('gnome');

  console.log('DnD5eRacesData:', DnD5eRacesData);
  console.log('DnD5eRaceData:', DnD5eRaceData);
  console.log('DnD5eSubraceData:', DnD5eSubraceData);
  console.log('DnD5eRacesProficienciesData:', DnD5eRacesProficienciesData);
  console.log('DnD5eRacesTraitsData:', DnD5eRacesTraitsData);

  if (isLoadingRandom5eSpecies) {
    return <LoadingIndicator />;
  }

  if (Random5eSpeciesError || !Random5eSpeciesData) {
    return (
      <div className="">
        <p>Error loading species data: {Random5eSpeciesError?.message ?? 'No data.'}</p>
      </div>
    );
  }

  // return (
  //   <div className="flow">
  //     <h1 className="">Species: {data.name}</h1>
  //     <p className="">{data.desc}</p>
  //     {!!data.traits?.length && (
  //       <ol className="flow">
  //         {data.traits.map((trait) => (
  //           <li key={trait.name} className="flow">
  //             <strong className="">{trait.name}:</strong>
  //             <p className="">{trait.desc}</p>
  //           </li>
  //         ))}
  //       </ol>
  //     )}
  //   </div>
  // );

  return (
    // <div className={`grid | container | ${GridStyles}`} data-rows="masonry">
    //   <div className={`${GridItemOutlineStyles} | ${GridItemSpanColStyles}`}>{Random5eSpeciesData?.name}</div>
    //   <div className={GridItemOutlineStyles}>asdf</div>
    //   <div className={GridItemOutlineStyles} style={{ height: '200px' }}>
    //     asdf
    //   </div>
    //   <div className={GridItemOutlineStyles}>asdf</div>
    //   <div className={GridItemOutlineStyles}>asdf</div>
    // </div>
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
                <input name="classlevel" placeholder="Paladin 2" />
              </li>
              <li>
                <label htmlFor="background">Background</label>
                <input name="background" placeholder="Acolyte" />
              </li>
              <li>
                <label htmlFor="playername">Player Name</label>
                <input name="playername" placeholder="Player McPlayerface" />
              </li>
              <li>
                <label htmlFor="race">Race</label>
                <input name="race" placeholder="Half-elf" />
              </li>
              <li>
                <label htmlFor="alignment">Alignment</label>
                <input name="alignment" placeholder="Lawful Good" />
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
                      <input name="Strengthscore" placeholder="10" />
                    </div>
                    <div className="modifier">
                      <input name="Strengthmod" placeholder="+0" />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Dexterityscore">Dexterity</label>
                      <input name="Dexterityscore" placeholder="10" />
                    </div>
                    <div className="modifier">
                      <input name="Dexteritymod" placeholder="+0" />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Constitutionscore">Constitution</label>
                      <input name="Constitutionscore" placeholder="10" />
                    </div>
                    <div className="modifier">
                      <input name="Constitutionmod" placeholder="+0" />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Wisdomscore">Wisdom</label>
                      <input name="Wisdomscore" placeholder="10" />
                    </div>
                    <div className="modifier">
                      <input name="Wisdommod" placeholder="+0" />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Intelligencescore">Intelligence</label>
                      <input name="Intelligencescore" placeholder="10" />
                    </div>
                    <div className="modifier">
                      <input name="Intelligencemod" placeholder="+0" />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Charismascore">Charisma</label>
                      <input name="Charismascore" placeholder="10" />
                    </div>
                    <div className="modifier">
                      <input name="Charismamod" placeholder="+0" />
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
                  <input name="proficiencybonus" placeholder="+2" />
                </div>
                <div className="saves list-section box">
                  <ul>
                    <li>
                      <label htmlFor="Strength-save">Strength</label>
                      <input name="Strength-save" placeholder="+0" type="text" />
                      <input name="Strength-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Dexterity-save">Dexterity</label>
                      <input name="Dexterity-save" placeholder="+0" type="text" />
                      <input name="Dexterity-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Constitution-save">Constitution</label>
                      <input name="Constitution-save" placeholder="+0" type="text" />
                      <input name="Constitution-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Wisdom-save">Wisdom</label>
                      <input name="Wisdom-save" placeholder="+0" type="text" />
                      <input name="Wisdom-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Intelligence-save">Intelligence</label>
                      <input name="Intelligence-save" placeholder="+0" type="text" />
                      <input name="Intelligence-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Charisma-save">Charisma</label>
                      <input name="Charisma-save" placeholder="+0" type="text" />
                      <input name="Charisma-save-prof" type="checkbox" />
                    </li>
                  </ul>
                  <div className="label">Saving Throws</div>
                </div>
                <div className="skills list-section box">
                  <ul>
                    <li>
                      <label htmlFor="Acrobatics">
                        Acrobatics <span className="skill">(Dex)</span>
                      </label>
                      <input name="Acrobatics" placeholder="+0" type="text" />
                      <input name="Acrobatics-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Animal Handling">
                        Animal Handling <span className="skill">(Wis)</span>
                      </label>
                      <input name="Animal Handling" placeholder="+0" type="text" />
                      <input name="Animal Handling-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Arcana">
                        Arcana <span className="skill">(Int)</span>
                      </label>
                      <input name="Arcana" placeholder="+0" type="text" />
                      <input name="Arcana-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Athletics">
                        Athletics <span className="skill">(Str)</span>
                      </label>
                      <input name="Athletics" placeholder="+0" type="text" />
                      <input name="Athletics-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Deception">
                        Deception <span className="skill">(Cha)</span>
                      </label>
                      <input name="Deception" placeholder="+0" type="text" />
                      <input name="Deception-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="History">
                        History <span className="skill">(Int)</span>
                      </label>
                      <input name="History" placeholder="+0" type="text" />
                      <input name="History-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Insight">
                        Insight <span className="skill">(Wis)</span>
                      </label>
                      <input name="Insight" placeholder="+0" type="text" />
                      <input name="Insight-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Intimidation">
                        Intimidation <span className="skill">(Cha)</span>
                      </label>
                      <input name="Intimidation" placeholder="+0" type="text" />
                      <input name="Intimidation-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Investigation">
                        Investigation <span className="skill">(Int)</span>
                      </label>
                      <input name="Investigation" placeholder="+0" type="text" />
                      <input name="Investigation-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Medicine">
                        Medicine <span className="skill">(Wis)</span>
                      </label>
                      <input name="Medicine" placeholder="+0" type="text" />
                      <input name="Medicine-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Nature">
                        Nature <span className="skill">(Int)</span>
                      </label>
                      <input name="Nature" placeholder="+0" type="text" />
                      <input name="Nature-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Perception">
                        Perception <span className="skill">(Wis)</span>
                      </label>
                      <input name="Perception" placeholder="+0" type="text" />
                      <input name="Perception-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Performance">
                        Performance <span className="skill">(Cha)</span>
                      </label>
                      <input name="Performance" placeholder="+0" type="text" />
                      <input name="Performance-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Persuasion">
                        Persuasion <span className="skill">(Cha)</span>
                      </label>
                      <input name="Persuasion" placeholder="+0" type="text" />
                      <input name="Persuasion-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Religion">
                        Religion <span className="skill">(Int)</span>
                      </label>
                      <input name="Religion" placeholder="+0" type="text" />
                      <input name="Religion-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Sleight of Hand">
                        Sleight of Hand <span className="skill">(Dex)</span>
                      </label>
                      <input name="Sleight of Hand" placeholder="+0" type="text" />
                      <input name="Sleight of Hand-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Stealth">
                        Stealth <span className="skill">(Dex)</span>
                      </label>
                      <input name="Stealth" placeholder="+0" type="text" />
                      <input name="Stealth-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Survival">
                        Survival <span className="skill">(Wis)</span>
                      </label>
                      <input name="Survival" placeholder="+0" type="text" />
                      <input name="Survival-prof" type="checkbox" />
                    </li>
                  </ul>
                  <div className="label">Skills</div>
                </div>
              </div>
            </section>
            <div className="passive-perception box">
              <div className="label-container">
                <label htmlFor="passiveperception">Passive Wisdom (Perception)</label>
              </div>
              <input name="passiveperception" placeholder="10" />
            </div>
            <div className="otherprofs box textblock">
              <label htmlFor="otherprofs">Other Proficiencies and Languages</label>
              <textarea name="otherprofs"></textarea>
            </div>
          </section>
          <section>
            <section className="combat">
              <div className="armorclass">
                <div>
                  <label htmlFor="ac">Armor Class</label>
                  <input name="ac" placeholder="10" type="text" />
                </div>
              </div>
              <div className="initiative">
                <div>
                  <label htmlFor="initiative">Initiative</label>
                  <input name="initiative" placeholder="+0" type="text" />
                </div>
              </div>
              <div className="speed">
                <div>
                  <label htmlFor="speed">Speed</label>
                  <input name="speed" placeholder="30" type="text" />
                </div>
              </div>
              <div className="hp">
                <div className="regular">
                  <div className="max">
                    <label htmlFor="maxhp">Hit Point Maximum</label>
                    <input name="maxhp" placeholder="10" type="text" />
                  </div>
                  <div className="current">
                    <label htmlFor="currenthp">Current Hit Points</label>
                    <input name="currenthp" type="text" />
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
                    <input name="totalhd" placeholder="2d10" type="text" />
                  </div>
                  <div className="remaining">
                    <label htmlFor="remaininghd">Hit Dice</label>
                    <input name="remaininghd" type="text" />
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
                <textarea></textarea>
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
                <textarea placeholder="Equipment list here"></textarea>
              </div>
            </section>
          </section>
          <section>
            <section className="flavor">
              <div className="personality">
                <label htmlFor="personality">Personality</label>
                <textarea name="personality"></textarea>
              </div>
              <div className="ideals">
                <label htmlFor="ideals">Ideals</label>
                <textarea name="ideals"></textarea>
              </div>
              <div className="bonds">
                <label htmlFor="bonds">Bonds</label>
                <textarea name="bonds"></textarea>
              </div>
              <div className="flaws">
                <label htmlFor="flaws">Flaws</label>
                <textarea name="flaws"></textarea>
              </div>
            </section>
            <section className="features">
              <div>
                <label htmlFor="features">Features & Traits</label>
                <textarea name="features"></textarea>
              </div>
            </section>
          </section>
        </main>
      </form>
    </div>
  );
}

// const GridStyles = css`
//   --grid-placement: 3;
//   --grid-min-item-size: 1ch;
//   --grid-gap: 2px;
// `;

// const GridItemOutlineStyles = css`
//   outline: 2px solid red;
// `;

// const GridItemSpanColStyles = css`
//   grid-column: 1 / -1;
// `;

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
