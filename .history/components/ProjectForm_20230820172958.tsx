"use client"

import Image from "next/image";
import { SessionInterface } from "@/common.types"
import { ChangeEvent, useState } from "react";

import FormField from "./FormField";
import { categoryFilters } from "./constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
    type: string,
    session: SessionInterface,
}

const ProjectForm = ({ type, session }: Props) => {
    const router = useRouter();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        const { token } = await fetchToken();

        try {
            if(type === 'create') {
                await createNewProject(form, session?.user?.id, token);

                router.push('/');
            }
        } catch (error) {
            console.log("Error", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];

        if(!file) return;

        if(!file.type.includes('image')) {
            return alert('please upload an image file');
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;

            handleStateChange('image', result);
        }
    };


    const handleStateChange = (fieldName: string, value: string) => {
        setform((prevState) => ({ ...prevState, [fieldName]: value}))
    };


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setform] = useState ({
        title: '',
        description: '',
        image: '',
        liveSiteUrl: '',
        githubUrl: '',
        category: '',
    })

  return (
    <form 
    onSubmit={handleFormSubmit}
    className="flexStart form"
    >
        <div className="flexStart form_image-container">
            <label htmlFor="poster" className="flexCenter form_image-label">
                {!form.image && 'choose a poster for your project'}
                </label>    
                <input 
                id="image"
                type="file"
                accept="image/*"
                required={type === 'create'}
                className="form_image-input"
                onChange={handleChangeImage}
                />
                {form.image && (
                    <Image 
                    src={form?.image}
                    className="sm:p-10 object-contain z-20"
                    alt="project poster"
                    fill
                    />
                )}
        </div>

    <FormField
    title="Title"
    state={form.title}
    placeholder="Flexibble"
    setState={(value) => handleStateChange('title', value)}
    />
     <FormField
    title="description"
    state={form.description}
    placeholder="Showcase and discover remarkable projects"
    setState={(value) => handleStateChange('description', value)}
    />
     <FormField
    type="url"
    title="Website Url"
    state={form.liveSiteUrl}
    placeholder="https://www.voorbeeld.nl"
    setState={(value) => handleStateChange('liveSiteUrl', value)}
    />
     <FormField
    type="url"
    title="Github Url"
    state={form.githubUrl}
    placeholder="https//github.nl"
    setState={(value) => handleStateChange('githubUrl', value)}
    />

    <CustomMenu 
    title="catogory"
    state={form.category}
    filters={categoryFilters}
    setState={(value) => handleStateChange('category', value)}
    />

    <div className="flexStart w-full">
        <Button
        title={isSubmitting
        ? `${type === 'create' ? 'Creating' : 'Editing'}`
        : `${type === 'create' ? 'Create' : 'Edit'}`
}
        type="submit"
        leftIcon={isSubmitting ? "" : '/plus.svg'} 
        isSubmitting={isSubmitting}
       />
    </div>

    </form>
  )
}



export default ProjectForm
