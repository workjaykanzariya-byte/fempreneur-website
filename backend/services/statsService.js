import { query } from '../config/db.js';

export const getPlatformStats = async () => {
  let nomCount = 0;
  let voteCount = 0;
  let memCount = 0;
  let eventCount = 0;
  let bookCount = 0;
  let storyCount = 0;

  try {
    const res = await query('SELECT COUNT(*) FROM web_nominations');
    nomCount = parseInt(res.rows[0].count, 10) || 0;
  } catch (e) {
    try {
      const res = await query('SELECT COUNT(*) FROM nominations');
      nomCount = parseInt(res.rows[0].count, 10) || 0;
    } catch {}
  }

  try {
    const res = await query('SELECT COUNT(*) FROM web_nomination_votes');
    voteCount = parseInt(res.rows[0].count, 10) || 0;
  } catch (e) {
    try {
      const res = await query('SELECT COUNT(*) FROM votes');
      voteCount = parseInt(res.rows[0].count, 10) || 0;
    } catch {}
  }

  try {
    const res = await query('SELECT COUNT(*) FROM web_community_applications');
    memCount = parseInt(res.rows[0].count, 10) || 0;
  } catch {}

  try {
    const res = await query('SELECT COUNT(*) FROM web_event_registrations');
    eventCount = parseInt(res.rows[0].count, 10) || 0;
  } catch {}

  try {
    const res = await query('SELECT COUNT(*) FROM web_coffee_table_book_orders');
    bookCount = parseInt(res.rows[0].count, 10) || 0;
  } catch {}

  return {
    editions: '6+',
    womenEntrepreneurs: 500 + nomCount,
    totalNominations: 100 + nomCount,
    totalVotesRecorded: voteCount,
    totalMembers: memCount,
    totalEventRegistrations: eventCount,
    totalBookOrders: bookCount,
    totalStoriesDocumented: 10000 + storyCount,
    awardCategories: '40 Named Categories',
  };
};
