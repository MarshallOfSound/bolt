// @flow
import { projectRemove, toProjectRemoveOptions } from '../remove';
import { copyFixtureIntoTempDir } from 'jest-fixtures';
import * as fs from 'fs';
import * as path from 'path';
import * as yarn from '../../../utils/yarn';

jest.mock('../../../utils/logger');
jest.mock('../../../utils/yarn');

describe('pyarn project remove', () => {
  test('removing a project dependency only used by the project', async () => {
    let tempDir = await copyFixtureIntoTempDir(
      __dirname,
      'package-with-external-deps-installed'
    );

    await projectRemove(
      toProjectRemoveOptions(['project-only-dep'], { cwd: tempDir })
    );

    expect(yarn.remove).toHaveBeenCalledTimes(1);
    expect(yarn.remove).toHaveBeenCalledWith(['project-only-dep'], tempDir);
  });
});
