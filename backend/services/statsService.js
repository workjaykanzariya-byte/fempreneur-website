import { query } from '../config/db.js';

export const getPlatformStats = async () => {
  const [nomRes, voteRes, memRes, eventRes, bookRes, storyRes] = await Promise.all([
    query('SELECT COUNT(*) FROM nominations'),
    query('SELECT COUNT(*) FROM votes'),
    query('SELECT COUNT(*) FROM memberships'),
    query('SELECT COUNT(*) FROM event_registrations'),
    query('SELECT COUNT(*) FROM book_orders'),
    query('SELECT COUNT(*) FROM story_submissions'),
  ]);

  return {
    editions: '6+',
    womenEntrepreneurs: 500 + parseInt(nomRes.rows[0].count, 10),
    totalNominations: parseInt(nomRes.rows[0].count, 10),
    totalVotesRecorded: parseInt(voteRes.rows[0].count, 10),
    totalMembers: parseInt(memRes.rows[0].count, 10),
    totalEventRegistrations: parseInt(eventRes.rows[0].count, 10),
    totalBookOrders: parseInt(bookRes.rows[0].count, 10),
    totalStoriesDocumented: 10000 + parseInt(storyRes.rows[0].count, 10),
    awardCategories: '40 Named Categories',
  };
};
