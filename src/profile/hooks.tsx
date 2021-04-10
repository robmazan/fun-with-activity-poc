import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { ListProfilesQuery, Profile } from "../API";
import { listProfiles } from "../graphql/queries";

export const useProfile = () => {
  const [profile, setProfile] = useState<Partial<Profile> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await API.graphql(graphqlOperation(listProfiles)) as GraphQLResult<ListProfilesQuery>;
      const profiles = res?.data?.listProfiles?.items || [];
      const userProfile: Partial<Profile> = profiles[0] || {};
      setProfile(userProfile);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    profile,
    loadProfile,
    isLoading,
  };
};
