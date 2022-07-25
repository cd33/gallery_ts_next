import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { SyntheticEvent, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

type Vocab = {
  en: string;
  fr: string;
};

export async function getStaticProps() {
  const data = await import("../../data/lists.json");
  const array = data.englishList;

  if (array.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      array,
    },
  };
}

export default function MarketPlace(props: { array: Vocab[] }) {
  const enWord = useRef<HTMLInputElement>(null)
  const frWord = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (enWord.current && frWord.current) {
      const newWord = {
        en: enWord.current.value,
        fr: frWord.current.value,
      };

      fetch("/api/vocapi", {
        method: "POST",
        body: JSON.stringify(newWord),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data :>> ", data);
        });
      enWord.current.value = "";
      frWord.current.value = "";
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" width="100%">
      <h1>Liste de Vocabulaire</h1>
      <ul>
        {props.array.map((el: Vocab) => (
          <li key={uuidv4()}>
            <Link href={`/marketPlace/${Object.getOwnPropertyNames(el)}`}>
              <a>{Object.keys(el)[0]}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <label htmlFor="addEn">
              Ajouter un mot en Anglais
              <input
                ref={enWord}
                type="text"
                id="addEn"
                name="addEn"
                placeholder="Mot en Anglais"
                required
              />
            </label>
            <label htmlFor="addFr">
              Ajouter un mot en Français
              <input
                ref={frWord}
                type="text"
                id="addFr"
                name="addFr"
                placeholder="Mot en Français"
                required
              />
            </label>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </Flex>
  );
}
