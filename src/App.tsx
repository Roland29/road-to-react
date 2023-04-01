import * as React from 'react';

type Story = {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type Stories = Story[];

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const useStorageState = (
    key: string,
    initialState: string
  ): [string, (newValue: string) => void] => {
    const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/*<Search onSearch={handleSearch} searchTerm={searchTerm} />*/}
      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch} isFocused>
        Search:
      </InputWithLabel>

      <hr />

      <List list={searchStories} />
    </div>
  );
};

type SearchProps = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
};
// eslint-disable-next-line
const Search: React.FC<SearchProps> = (props) => {
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={props.onSearch} defaultValue={props.searchTerm} />

      <p>
        Searching for <strong>{props.searchTerm}</strong>.
      </p>
    </>
  );
};

type ListProps = {
  list: Stories;
};

const List: React.FC<ListProps> = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

type ItemProps = {
  item: Story;
};

const Item: React.FC<ItemProps> = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  isFocused: boolean;
};
const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id}>{children} </label>
      &nbsp;
      <input id={id} type={type} onChange={onInputChange} value={value} ref={inputRef} />
      <p>
        Searching for <strong>{value}</strong>.
      </p>
    </>
  );
};
export default App;
