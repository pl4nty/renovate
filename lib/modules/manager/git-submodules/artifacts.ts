import { logger } from '../../../logger';
import { readLocalFile } from '../../../util/fs';
import type { UpdateArtifact, UpdateArtifactsResult } from '../types';

export default async function updateArtifacts({
  updatedDeps,
}: UpdateArtifact): Promise<UpdateArtifactsResult[] | null> {
  const res: UpdateArtifactsResult[] = [];
  for (const dep of updatedDeps) {
    // TODO: types (#7154)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    logger.info(`Updating submodule ${dep.depName}`);
    res.push({
      file: { type: 'addition', path: dep.depName!, contents: '' },
    });
    res.push({
      file: {
        type: 'addition',
        path: dep.packageFile!,
        contents: await readLocalFile(dep.packageFile!),
      },
    });
  }

  return res;
}
