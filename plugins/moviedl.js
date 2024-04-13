import Movie from '@sl-code-lords/movie-dl';


const api = new Movie();

let handler = async (m, { conn }) => {
  try {
    const [command, movieId] = m.text.split(' ');

    if (command === '.moviedl' && !movieId) {
      await sendMovieList(m, conn);
    } else if (command === '.moviedl' && movieId) {
      await sendSpecificMovie(movieId, m, conn);
    }
  } catch (error) {
    console.error(error);
    m.react('❌');
  }
};

async function sendMovieList(m, conn) {
  const movieList = await api.list();
  const movieItems = movieList.results;
  let movieText = '';

  for (const movie of movieItems) {
    movieText += `•───── 💝 Queen Hentai 💝 ─────•
❖ 𝑺𝑻𝑨𝑻𝑼𝑺: Active
㋡ 𝑪𝑹𝑬𝑨𝑻𝑶𝑹: Dinuwa
*☞ Movie :* ${movie.title}
*🆔 News ID :* ${movie.id}
•───── 💝 Queen Hentai 💝 ─────•\n\n`;
  }

  conn.sendMessage(m.chat, { text: movieText, quoted: m, contextInfo: { mentionedJid: [m.sender] } });
  m.react('✅');
}

async function sendSpecificMovie(movieId, m, conn) {
  const movieInfo = await api.movie(movieId);

  const movieCaption = `•───── 💝 Queen Hentai 💝 ─────•
❖ 𝑺𝑻𝑨𝑻𝑼𝑺: Active
㋡ 𝑪𝑹𝑬𝑨𝑻𝑶𝑹: Dinuwa
*☞ Movie :* ${movieInfo.results.TITLE}
*📅 Date :* ${movieInfo.results.PUBLISHED}
*🔗 Url :* ${movieInfo.results.URL}
*🗞️ Description :* ${movieInfo.results.full_movie}
•───── 💝 Queen Hentai 💝 ─────•`;

  conn.sendFile(m.chat, movieInfo.results.COVER, 'thumbnail.jpg', movieCaption, m);
  m.react('✅');
}

handler.help = ['moviedl'];
handler.tags = ['moviedl'];
handler.command = ['moviedl'];

export default handler;
