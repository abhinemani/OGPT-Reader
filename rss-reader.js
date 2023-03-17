// Fetch and display feed items function from the previous JavaScript example
async function fetchFeedItems(url) {
  try {
    const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
    const response = await fetch(proxyUrl + encodeURIComponent(url));
    
    if (!response.ok) {
      throw new Error('Failed to fetch the feed');
    }
    
    const data = await response.json();
    displayFeedItems(data.items);
  } catch (error) {
    console.error('Error fetching feed:', error);
  }
}

function displayFeedItems(items) {
  const feedList = document.querySelector('.feed-list');
  
  items.forEach(item => {
    const feed = document.createElement('article');
    feed.className = 'feed';

    const title = document.createElement('h2');
    title.className = 'feed-title';
    title.textContent = item.title;

    const link = document.createElement('a');
    link.className = 'feed-link';
    link.href = item.link;
    link.textContent = item.link;

    const pubDate = document.createElement('p');
    pubDate.className = 'feed-date';
    pubDate.textContent = 'Published: ' + new Date(item.pubDate).toLocaleDateString();

    feed.appendChild(title);
    feed.appendChild(link);
    feed.appendChild(pubDate);
    feedList.appendChild(feed);
  });
}

// Example RSS feed URLs
const rssUrls = [
  'https://abhinemani.com/feed.xml',
  'https://nationalzoo.si.edu/news.rss',
  'https://stories.sandiegozoo.org/category/news/feed/'
];

// Fetch and display feed items for each RSS feed URL
rssUrls.forEach(url => fetchFeedItems(url));

// Populate the subscription list in the sidebar
const subscriptionList = document.querySelector('.sidebar ul');
rssUrls.forEach(url => {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = '#';
  link.textContent = 'Subscription for ' + url;
  listItem.appendChild(link);
  subscriptionList.appendChild(listItem);
});