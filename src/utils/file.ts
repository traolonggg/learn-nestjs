import * as fs from 'fs';
import * as path from 'path';
export function readFromFile<T>(fileName: string): T {
  const filePath = path.join(__dirname, '..', 'seeds', fileName);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as T;
}
