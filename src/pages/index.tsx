import Head from "next/head";
import Image from "next/image";

import JasonIcon from "/public/jsonIcon.png";
import styles from "../styles/Home.module.scss";
import Router from "next/router";
import { useRef, useEffect } from "react";

export default function Home() {
  const movieTitleRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: any) {
    e.preventDefault();
    Router.push("/movie/" + movieTitleRef.current?.value);
  }

  return (
    <>
      <Head>
        <title>Old Blockbuster</title>
      </Head>
      <main className={styles.main}>
        <section>
          <h1>Old Blockbuster</h1>
          <Image
            src={JasonIcon}
            alt="Jason's mask from Friday the 13th."
            width={200}
            height={200}
          />
        </section>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="movie-title">Search for a Movie:</label>
          <input
            required
            ref={movieTitleRef}
            type="text"
            name="movie-title"
            id="movie-title"
          />
        </form>
      </main>
    </>
  );
}
