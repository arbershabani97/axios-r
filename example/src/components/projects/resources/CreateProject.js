import './styles/CreateProject.scss'

import React from 'react'
import { useForm } from 'react-hook-form'

import { postProject } from '../../../store/components/projects/projects.API'
import { useAPI } from '../../../utils/useAPI'
import Input from '../../shared/Input'

const CreateProject = () => {
  const { register, handleSubmit, errors, reset } = useForm()
  // eslint-disable-next-line no-unused-vars
  const { onSubmit, loading, apiError } = useAPI({ apiFn: postProject, reset })

  return (
    <form className='CreateProject' onSubmit={handleSubmit(onSubmit)}>
      <Input
        error={errors?.['title']}
        name='title'
        placeholder='title'
        register={register({
          required: 'Your input is required',
          maxLength: {
            value: 3,
            message: 'This input exceed maxLength.'
          }
        })}
        type='text'
      />
      <Input
        error={errors?.['userId']}
        name='userId'
        placeholder='userId'
        register={register({ required: 'Your input is required' })}
        type='text'
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default CreateProject
