import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { FormEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { CreateProfileMutation, ListProfilesQuery, Profile, UpdateProfileMutation } from "../API";
import { createProfile, updateProfile } from "../graphql/mutations";
import { listProfiles } from "../graphql/queries";
import { Button, Form, FormActions, FormSection, FormSectionTitle, InputField, Label } from "../ui";

function getFormValue(form: HTMLFormElement, name: string): string {
  return (form.elements.namedItem(name) as HTMLInputElement).value;
}

export const ProfileForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [profile, setProfile] = useState<Partial<Profile> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.graphql(graphqlOperation(listProfiles)) as GraphQLResult<ListProfilesQuery>;
        const profiles = res?.data?.listProfiles?.items || [];
        const userProfile: Partial<Profile> = profiles[0] || {};
        setProfile(userProfile);
        if (formRef.current) {
          ["name", "height", "weight", "dob"].forEach(field => {
            const control = formRef.current!.elements.namedItem(field) as HTMLInputElement;
            control.value = String(userProfile[field as keyof Profile]);
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit = useCallback<FormEventHandler>(async (ev) => {
    ev.preventDefault();
    try {
      const form = ev.target as HTMLFormElement;
      const input: Partial<Profile> = {
        name: getFormValue(form, "name"),
        height: Number.parseFloat(getFormValue(form, "height")),
        weight: Number.parseFloat(getFormValue(form, "weight")),
        dob: getFormValue(form, "dob"),
      };
      if (profile !== null) {
        await API.graphql(graphqlOperation(updateProfile, { input: { ...input, id: profile.id } } )) as GraphQLResult<UpdateProfileMutation>;
      } else {
        await API.graphql(graphqlOperation(createProfile, { input } )) as GraphQLResult<CreateProfileMutation>;
      }
    } catch(error) {
      console.error(error);
    }
  }, [profile]);

  if (profile === null) {
    return null;
  }
  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <FormSection>
        <FormSectionTitle>Profile data</FormSectionTitle>

        <Label htmlFor="profile_name">Name</Label>
        <InputField id="profile_name" name="name" required />

        <Label htmlFor="profile_height">Height (cm)</Label>
        <InputField id="profile_height" name="height" type="number" required />

        <Label htmlFor="profile_weight">Weight (kg)</Label>
        <InputField id="profile_weight" name="weight" type="number" required />

        <Label htmlFor="profile_dob">Date of Birth</Label>
        <InputField id="profile_dob" name="dob" type="date" required />
      </FormSection>
      <FormActions>
        <Button>Submit</Button>
      </FormActions>
    </Form>
  );
};
