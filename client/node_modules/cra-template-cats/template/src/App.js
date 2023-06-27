import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://media3.giphy.com/media/13CoXDiaCcCoyk/giphy.gif?cid=ecf05e47mkcj61h3gjm3wjb2p4a067eiutl03vig47jsrksp&rid=giphy.gif&ct=g"
          className="App-logo"
          alt="cat shoulder shake"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn <span style={{ textDecoration: 'line-through' }}>Recat</span>{' '}
          React
        </a>
      </header>
      <main>
        <p>
          You probably meant to run <code>npx create-react-app</code> instead of{' '}
          <code>npx create-recat-app</code>, but we're all here now and you
          might as well enjoy some cats while you're at it.
        </p>
        <p className="images">
          <img
            src="https://media4.giphy.com/media/ICOgUNjpvO0PC/giphy.gif?cid=790b76118fbd3d2f0a35e8ff4036a66280840c2540f58474&rid=giphy.gif&ct=g"
            alt="cat waving"
          />
          <img
            src="https://media2.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif?cid=790b7611a46365babee79d6ce8d46d72eed5122eee0e6ef0&rid=giphy.gif&ct=g"
            alt="cat developer"
          />
          <img
            src="https://media3.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif?cid=790b7611e3ce0fc616ae6fb98d342b0b8131d965c75fac1b&rid=giphy.gif&ct=g"
            alt="cat fast typing"
          />
          <img
            src="https://media3.giphy.com/media/12PA1eI8FBqEBa/giphy.gif?cid=790b7611dfb7917b89f875b566ebedb7dc44135253c05172&rid=giphy.gif&ct=g"
            alt="cat with chicks"
          />
          <img
            src="https://media1.giphy.com/media/krZUvydC7Qrdu/giphy.gif?cid=790b7611c21df70db966c73cf4817e5bd79d5b4711ddc9f9&rid=giphy.gif&ct=g"
            alt="cat riding ram"
          />
          <img
            src="https://media3.giphy.com/media/10dU7AN7xsi1I4/giphy.gif?cid=790b7611a97153a9f993c7fc252257c0bb66399df74945ab&rid=giphy.gif&ct=g"
            alt="cat all for one"
          />
          <img
            src="https://media1.giphy.com/media/17Q92poP1qJwI/giphy.gif?cid=790b7611400844530bf6fe0debc6685cbcd4fff4ce6fd067&rid=giphy.gif&ct=g"
            alt="cat teddy bear"
          />
        </p>
        <p>
          If you like tools that save you the pain of managing a build system,
          check out Nx at{' '}
          <a href="https://nx.dev/react">https://nx.dev/react</a>.
        </p>
      </main>
    </div>
  );
}

export default App;
