import gql from 'graphql-tag';

/** Records to select from post comments */
export const postCommentsPayload = `
  comments {
    id
    comment
    author {
      id
      username
      image
    }
  }
`;

/** Records to select from post author */
export const postAuthorPayload = `
  author {
    id
    username
    phonenumber
    image
    following {
      id
      user
    }
    followers {
      id
      user
    }
    notifications {
      id
      author {
        id
        username
      }
      follow {
        id
      }
      like {
        id
      }
      comment {
        id
      }
    }
  }
`;

/** Records to select from post likes */
export const postLikesPayload = `
  likes {
    id
    user
    post
  }
`;


/** Creates a post */
export const CREATE_POST = gql`
  mutation(
        $title:String,
        $description:String,
        $price:String,
        $features: String
        $image: Upload,
        $authorId: ID!,
        $crossedPrice:String
  ) {
    createPost(title:$title, description:$description, features:$features, price:$price, crossedPrice:$crossedPrice, image:$image, authorId:$authorId) {
      id
    }
  }
`;



/** Gets all posts from followed users */
export const GET_FOLLOWED_POSTS = gql`
  query($userId: String!, $skip: Int, $limit: Int) {
    getFollowedPosts(userId: $userId, skip: $skip, limit: $limit) {
      count
      posts {
        id
        title
        description
        features
        price
        crossedPrice
        image
        imagePublicId
        createdAt
        ${postAuthorPayload}
        ${postCommentsPayload}
        ${postLikesPayload}
      }
    }
  }
`;

/**Gets all available posts */
export const GET_POSTS = gql`
  query( $skip: Int, $limit: Int) {
    getPosts( skip: $skip, limit: $limit)
     {
      count
      posts {
        id
        title
        description
        features
        price
        location
        crossedPrice
        image
        createdAt
        ${postAuthorPayload}
        ${postCommentsPayload}
        ${postLikesPayload}
      }
    }
  }
`;


/**Gets all available posts */
export const GET_PAGINATED_POSTS = gql`
  query( $cursor: String, $limit: Int) {
    getPaginatedPosts( cursor: $cursor, limit: $limit)
     {
      count
      cursor
      hasMore
      posts {
        id
        title
        description
        features
        price
        location
        crossedPrice
        image
        createdAt
        ${postAuthorPayload}
        ${postCommentsPayload}
        ${postLikesPayload}
      }
    }
  }
`;




/** Gets specific post by id */
export const GET_POST = gql`
  query($id: ID!) {
    getPost(id: $id) {
      id
      title
      description
      features
      price
      location
      crossedPrice
      image
      createdAt
      ${postAuthorPayload}
      ${postCommentsPayload}
      ${postLikesPayload}
    }
  }
`;


/**
 * Searches posts by title or description or price
 */
export const SEARCH_POSTS = gql`
  query($searchQuery: String!) {
    searchPosts(searchQuery: $searchQuery) {
      id
      title
      description
      features
      location
      price
      crossedPrice
      image
      imagePublicId
      createdAt
    }
  }
`;


/** Deletes a post */
export const DELETE_POST = gql`
  mutation($id: ID! $imagePublicId:String) {
    deletePost(id: $id imagePublicId:$imagePublicId) {
      id
    }
  }
`;
