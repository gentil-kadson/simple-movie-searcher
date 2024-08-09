import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import Image from "next/image";
import MoviesService from "@/services/MoviesService";
import styles from "../../styles/Movie.module.scss";

type Movie = {
  Title: string;
  Rated: string;
  Runtime: string;
  Writer: string;
  Year: string;
  imdbRating: string;
  Poster: string;
};

type MovieNotFound = {
  Error: string;
  Response: string;
};

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const movies = new MoviesService();
  const result = await movies.getMovie(ctx.params?.slug as string);
  const movie: Movie | MovieNotFound = result;

  return {
    props: { movie },
  };
}) satisfies GetServerSideProps<{ movie: Movie | MovieNotFound }>;

export default function Movie({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let title = "Movie Not Found";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={styles.main}>
        {!("Error" in movie) ? (
          <section>
            <h1>{movie.Title}</h1>
            <div>
              <figure>
                <Image
                  src={movie.Poster}
                  width={300}
                  height={459}
                  alt="Poster of a movie"
                />
              </figure>
              <ul>
                <li>
                  <strong>IMDb:</strong> {movie.imdbRating}/10.0
                </li>
                <li>
                  <strong>Rated:</strong> {movie.Rated}
                </li>
                <li>
                  <strong>Runtime:</strong> {movie.Runtime}
                </li>
                <li>
                  <strong>Year:</strong> {movie.Year}
                </li>
                <li>
                  <strong>Writers:</strong> {movie.Writer}
                </li>
              </ul>
            </div>
          </section>
        ) : (
          <h1>This movie was not found in our database.</h1>
        )}
      </main>
    </>
  );
}
