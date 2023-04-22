import axios from "axios";

async function getRandomFact() {
  const response = await axios.get(
    "https://uselessfacts.jsph.pl/api/v2/facts/random"
  );
  return response.data.text;
}

export { getRandomFact };
