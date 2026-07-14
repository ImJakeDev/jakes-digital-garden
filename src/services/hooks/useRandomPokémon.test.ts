import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchRandomPokémon } from './useRandomPokémon';

const page = (count: number, name: string) => ({
  count,
  next: null,
  previous: null,
  results: [{ name, url: `https://pokeapi.co/api/v2/pokemon/${name}` }],
});

describe('fetchRandomPokémon', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('fetches the count first, then one randomly offset Pokémon', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(page(10, 'bulbasaur'))))
      .mockResolvedValueOnce(new Response(JSON.stringify(page(10, 'charmander'))));
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(Math, 'random').mockReturnValue(0.4);

    await expect(fetchRandomPokémon()).resolves.toBe('charmander');
    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://pokeapi.co/api/v2/pokemon?limit=1');
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://pokeapi.co/api/v2/pokemon?offset=4&limit=1');
  });
});
