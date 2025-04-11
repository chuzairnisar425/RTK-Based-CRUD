
import React from 'react';
import { Provider } from 'react-redux';
import PostList from './components/PostList/PostList';
import { store } from './App/store/store';
import AddFormPost from './components/AddPost/AddPost';


const App = () => {
  return (
    <Provider store={store}>
      <div  >
        <AddFormPost />
        <PostList />
      </div>
    </Provider>
  );
};

export default App;
