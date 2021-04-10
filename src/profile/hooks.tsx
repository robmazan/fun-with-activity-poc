import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { ListProfilesQuery, Profile } from "../API";
import { listProfiles } from "../graphql/queries";

export const useProfile = () => {
  const [profile, setProfile] = useState<Partial<Profile> | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      const res = await API.graphql(graphqlOperation(listProfiles)) as GraphQLResult<ListProfilesQuery>;
      const profiles = res?.data?.listProfiles?.items || [];
      const userProfile: Partial<Profile> = profiles[0] || {};
      setProfile(userProfile);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    profile,
    loadProfile,
  };
};
