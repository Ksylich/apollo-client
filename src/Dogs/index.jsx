import React, { useState } from "react";
import { gql, useQuery, NetworkStatus, useLazyQuery } from "@apollo/client";

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

const Dogs = ({ onDogSelected }) => {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error !!! :(</p>;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
};

const DogPhoto = ({ breed }) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
      // pollInterval: 500,
    }
  );

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <img
        src={data.dog.displayImage}
        style={{ height: 200, width: 200, margin: "2rem" }}
      />
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  );
};

const DogPhotoLazy = ({ breed }) => {
  const [getDog, { loading, data }] = useLazyQuery(GET_DOG_PHOTO);

  if (loading) return <p>Loading ...</p>;

  const onGetDog = () => {
    getDog({ variables: { breed } });
  };

  return (
    <div>
      {data && data.dog && (
        <img
          src={data.dog.displayImage}
          style={{ height: 200, width: 200, margin: "2rem" }}
        />
      )}
      <button onClick={onGetDog}>Click me!</button>
    </div>
  );
};

const DisplayDog = () => {
  const [selectedDog, setSelectedDog] = useState(null);

  const onDogSelected = ({ target }) => {
    setSelectedDog(target.value);
  };

  return (
    <>
      <Dogs onDogSelected={onDogSelected} />
      {/* {selectedDog && <DogPhoto breed={selectedDog} />} */}
      {selectedDog && <DogPhotoLazy breed={selectedDog} />}
    </>
  );
};

export default DisplayDog;
