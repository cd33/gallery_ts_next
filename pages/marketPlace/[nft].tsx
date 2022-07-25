// ANY to solve !
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { Flex, Text } from "@chakra-ui/react";
import { GetStaticPropsContext } from 'next';

type Vocab = {
  en: string,
  fr: string
}

export async function getStaticPaths() {
  const data = await import('../../data/lists.json')
  const paths = data.englishList.map((el) => ({
    params: { nft: Object.keys(el)[0] },
  }))

  return {
    // paths: [{ params: { nft: 'words' } }],
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext<{ nft: string }>) {
  const liste = context.params!.nft
  
  const data = await import('../../data/lists.json')
  
  if (data.englishList.length === 0) {
    return {
      notFound: true,
    }
  }

  const array: any = data.englishList.find((list) => Object.keys(list)[0] === liste)

  return {
    props: {
      array: array[liste],
    },
  }
}

export default function Nft(props: {array: Vocab[]}) {
  const router = useRouter()
  const name: string = router.query.nft as string

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <Flex direction="column" align="center" justify="center" width="100%">
      {name && <h1>{capitalizeFirstLetter(name)}</h1>}
      <table className={styles.tableau}>
        <thead>
          <tr>
            <th>English</th>
            <th>French</th>
          </tr>
        </thead>
        <tbody>
          {props.array.map((el: Vocab) => (
            <tr key={uuidv4()}>
              <td>{capitalizeFirstLetter(el.en)}</td>
              <td>{capitalizeFirstLetter(el.fr)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Flex>
  )
}
