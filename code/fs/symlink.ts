import path from 'path'
import symlinkDir from 'symlink-dir'

export async function symlinkDirectory({
  realDirectory,
  targetDirectory,
}: {
  realDirectory: string
  targetDirectory: string
}): Promise<{ reused: boolean; warn?: string }> {
  return symlinkDir(realDirectory, targetDirectory)
}
