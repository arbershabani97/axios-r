import './styles/EditProject.scss'

import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'

import { selectProject } from '../../../store/components/project/project.selector'
import { putProject } from '../../../store/components/projects/projects.API'
import { useAPI } from '../../../utils/useAPI'
import Input from '../../shared/Input'

const EditProject = ({ project }) => {
  const { id, title, userId } = project
  const { register, handleSubmit, errors, reset } = useForm()
  // eslint-disable-next-line no-unused-vars
  const { onSubmit, loading, apiError } = useAPI({ apiFn: putProject, reset })

  return (
    <form className='EditProject' onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={register({ required: true })}
        defaultValue={id}
        name='id'
        type='hidden'
      />
      <Input
        defaultValue={title}
        error={errors?.['title']}
        name='title'
        placeholder='title'
        register={register({ required: 'Your input is required' })}
        type='text'
      />
      <Input
        defaultValue={userId}
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

const mapStateToProps = (state) => ({ project: selectProject(state) })

export default connect(mapStateToProps)(EditProject)
