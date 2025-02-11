import 'dotenv/config';
import { Index as UpstashIndex } from '@upstash/vector';
import ora from 'ora';
import path from "path";
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Init vector db client
const index = new UpstashIndex({
  url: process.env.VECTOR_DB_URL,
  token: process.env.VECTOR_DB_TOKEN
});

// IMDB movie data indexer
export async function indexMovieData() {
  const spinner = ora('Reading movie data...').start();

  // Parse CSV file
  const csvPath = path.join(process.cwd(), 'src/rag/imdb_movie_dataset.csv');
  const csvData = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });

  spinner.text = 'Starting movie indexing';

  // Index each movie
  for (const movie of records) {
    spinner.text = `Indexing movie: ${movie.Title}`;
    // This is not a lot of tokens, this is what needs to chunked if there were a lot of tokens
    // each chunk then will be an upsert
    const text = `${movie.Title}:: ${movie.Genre} :: ${movie.Description}`;
    try {
      await index.upsert({
        id: movie.Title, // Using Rank as unique ID
        data: text, // This is what will be converted to a vector
        metadata: {
          title: movie.Title,
          year: Number(movie.Year),
          genre: movie.Genre,
          director: movie.Director,
          actors: movie.Actors,
          rating: Number(movie.Rating),
          votes: Number(movie.Votes),
          revenue: Number(movie.Revenue),
          metascore: Number(movie.Metascore),
        },
      })
    } catch (error) {
      spinner.fail(`Error indexing movie ${movie.Title}`)
      console.error(error)
    }
  }

  spinner.succeed('Finished indexing movie data')
}
indexMovieData();