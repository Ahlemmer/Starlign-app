import React, {useState, useEffect} from 'react'
import { getDocs, getFollower, getFollowing} from "./Firebase/firebase";


const NbreFollowersFollowings = ({userData, sabonner, desabonner}) => {

    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const getFollowings = async () => {
          const data = await getDocs(getFollowing(userData.userId));
          setFollowings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        const getFollowers = async () => {
            const data = await getDocs(getFollower(userData.userId));
            setFollowers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
      
          getFollowers();
        getFollowings();
      }, [userData.userId, sabonner, desabonner]);

    return (
        <>
             <div className="col-lg-4">
                  <h5> Abonnés:  {followers.length} </h5>
                </div>
                <div className="col-lg-6">
                  <h5> Abonnements : {followings.length} </h5>
                </div>
        </>
    )
}

export default NbreFollowersFollowings
