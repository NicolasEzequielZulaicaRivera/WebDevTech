import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const animalsDir = path.join(process.cwd(), "animals");

export function getAnimals(): AnimalDesc[] {
  const fileNames = fs.readdirSync(animalsDir);
  const data = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(animalsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      name: matterResult.data.name,
      description: matterResult.data.description,
    };
  });

  return data;
}

export async function getAnimal(id: string): Promise<AnimalFull> {
  const fullPath = path.join(animalsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    name: matterResult.data.name,
    description: matterResult.data.description,
    contentHtml,
  };
}

export interface AnimalDesc {
  id;
  name: string;
  description: string;
}

export interface AnimalFull extends AnimalDesc {
  contentHtml: string;
}
