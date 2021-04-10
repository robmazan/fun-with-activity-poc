import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Recommendation, RecommendationsQuery } from "../API";
import { recommendations } from "../graphql/queries";
import { useProfile } from "../profile";
import { PageTitle, Spinner } from "../ui";

const RecommendationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const getStyleForPriority = (priority: number) => {
  if (priority > 666) {
    return css`
      background-color: tomato;
    `;
  }
  if (priority > 333) {
    return css`
      background-color: orange;
    `;
  }
  return css`
    background-color: white;
  `;
}

type RecommendationItemProps = {
  priority: number;
};
const RecommendationItem = styled.li<RecommendationItemProps>`
  box-shadow: 0 0 5px gray;
  padding: 0 10px;
  border-radius: 5px;
  text-align: center;
  ${({ priority }) => getStyleForPriority(priority)}
`;

const RecommendationTitle = styled.h3`
    font-family: "Playfair Display", sans-serif;
`;
const RecommendationBody = styled.p``;

export const Recommendations: React.FC = () => {
  const { profile, isLoading } = useProfile();
  const [recommendationItems, setRecommendationItems] = useState<
    Recommendation[] | null
  >(null);

  useEffect(() => {
    if (profile?.id !== undefined) {
      (async () => {
        const { dob, height, weight } = profile;
        const res = (await API.graphql(
          graphqlOperation(recommendations, {
            input: {
              dob,
              height,
              weight,
            },
          })
        )) as GraphQLResult<RecommendationsQuery>;
        setRecommendationItems(res.data?.recommendations || []);
      })();
    }
  }, [profile]);

  if (!isLoading && profile?.id === undefined) {
    console.log(profile)
    return (
      <Redirect to="/profile" />
    );
  }

  return (
    <>
      <PageTitle>Recommendations</PageTitle>
      <RecommendationList>
        {recommendationItems === null && <Spinner />}
        {recommendationItems === null ? null : recommendationItems.map((recommendation, i) => (
          <RecommendationItem key={i} priority={recommendation.priority || 0}>
            <RecommendationTitle>
              {recommendation?.recommendation![0]}
            </RecommendationTitle>
            {recommendation.recommendation?.slice(1).map((bodyItem, i) => (
              <RecommendationBody key={i}>{bodyItem}</RecommendationBody>
            ))}
          </RecommendationItem>
        ))}
      </RecommendationList>
    </>
  );
};
