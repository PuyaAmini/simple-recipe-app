import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { projectFirestore } from "../../firebase/config";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsubscribe = projectFirestore.collection('recipes').get()
    .then(snapshot => {
      if(snapshot.empty){
        setError('no recipes to load')
        setIsPending(false)
      }else{
        let results = [];
        snapshot.docs.forEach(doc =>{
          results.push({id: doc.id , ...doc.data()})
        })
        setData(results)
        setIsPending(false)
      }
    }).catch(err => {
      setError(err.message)
      setIsPending(false)
    })
    
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Caricamento...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
