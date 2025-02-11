import { Index as UpstashIndex } from "@upstash/vector";

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})

type MovieMetadata = {
  title?: string
  year?: string
  genre?: string
  director?: string
  actors?: string
  rating?: string
  votes?: string
  revenue?: string
  metascore?: string
}

export const queryMovies = async (
  query: string,
  filters?: Partial<MovieMetadata>,
  topK: number = 7
) => {
  let filterStr = '';
  // Naive impl, upstash expects a query string for filtering using metadata
  // In a real app, pay close attention to this
  if (filters) {
    const filterParts = Object.entries(filters)
      .filter(([_, value]) => value != undefined)
      .map(([key, value]) => `${key}= '${value}'`);

    if (filterParts.length > 0) {
      filterStr = filterParts.join(' AND ');
    }
  }

  // Query the vector store
  const results = await index.query({
    data: query, // This gets converted to a vector and cosine similarity is done
    topK,
    filter: filterStr || undefined,
    includeData: true,
    includeMetadata: true,
    includeVectors: true,
  });

  return results;
}