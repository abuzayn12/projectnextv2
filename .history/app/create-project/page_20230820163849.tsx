import { redirect } from "next/navigation";

import Modal from "@/components/Modal"
import ProjectForm from "@/components/ProjectForm"
import { getCurrentUser } from "@/lib/session"

const CreateProject = async () => {
    const session = await getCurrentUser();

    if(!session?.user) redirect('/')
  return (
    <Modal>
      <h3 className="modal-head-text">
        create a new project
      </h3>

      <ProjectForm type="create" session={session} />
    </Modal>
  )
}

export default CreateProject;
