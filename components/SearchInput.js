const _handleKeyDown = (e, updateSearch) => {
  if (e.key === 'Enter') {
    let text = e.target.value;
    if (text.length > 3) updateSearch(text);
  }
};

// TODO implement real time search with debounce
// const handleChange = (e, updateSearch) => {
//   let text = e.target.value;
//   updateSearch(text);
// };

export default function SearchInput(props) {
  let search = (
    <input
      id="searchInput"
      type="text"
      placeholder="Search ..."
      className="w-1/3 rounded-lg dark:bg-gray-700 dark:text-gray-300"
      onKeyDown={(event) => _handleKeyDown(event, props.updateSearch)}
      //onChange={(event) => handleChange(event, props.updateSearch)}
    />
  );
  return search;
}
