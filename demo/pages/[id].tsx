import Link from "next/link";
import { getAnimals, getAnimal, AnimalFull } from "../lib/animals";

import style from "../styles/animals.module.css";

export async function getStaticPaths() {
  const animals = getAnimals();
  return {
    paths: animals.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const animal = await getAnimal(params.id);
  return {
    props: {
      animal,
    },
  };
}

export default function AnimalPage({
  animal: { name, description, contentHtml },
}: {
  animal: AnimalFull;
}) {
  return (
    <div className={style.container}>
      <Link href="/">
        <a>Go home</a>
      </Link>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
