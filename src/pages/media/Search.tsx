import { SearchbarChangeEventDetail } from '@ionic/core/dist/types/components/searchbar/searchbar-interface';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import ResultsList from '../../components/ResultsList';
import { BASE_URL } from '../../declarations';

const SearchPage: React.FC<any> = () => {

  const [results, setResults] = useState([]);

  const handleSearch = async (queryEvent: CustomEvent<SearchbarChangeEventDetail>) => {
    // tslint:disable-next-line: no-string-literal
    const query = queryEvent.target['value'];
    if (query !== '' && query.length > 3) {
      const response = await fetch(`${BASE_URL}/search/?q=${query}`)
        .then(res => res.json())
        .then(res => res.map(r => ({
          ...r,
          image: {
            url: r.i.imageUrl.replace('_V1_', '_SX100_')
          },
          title: r.l,
          titleType: r.q,
        })));

      setResults(response);
    }
    else if (query === '') {
      setResults([]);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar onIonChange={handleSearch} />
        <ResultsList results={results} />
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;