import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { useParams } from 'react-router';
import { CanProjectViewResponse } from '../../../network/protos';
import { ProjectContext } from '../../../stores/MeshContext';
import { BlockView } from './BlockView';
import { ProjectDashboard } from './ProjectDashboard';

export const ProjectViewMode = observer(() => {
  const ProjectStore = React.useContext(ProjectContext);
  const [canViewRes, setCanViewRes] = React.useState<CanProjectViewResponse>();
  const { slug } = useParams<{ slug: string }>();
  React.useEffect(() => {
    // Check if project exists and is public
    ProjectStore.canProjectView(slug).then((res) => {
      setCanViewRes(res);
      if (res.canView) {
        // Set view mode, fetch project
        ProjectStore.enableViewMode(res.msg);
      }
    });
  }, []);
  return (
    <>
      {canViewRes === undefined ? (
        <Box width="100vw" height="100vh" background="gray.800" />
      ) : !canViewRes.canView ? (
        <BlockView msg={canViewRes?.msg} />
      ) : (
        <ProjectDashboard />
      )}
    </>
  );
});
