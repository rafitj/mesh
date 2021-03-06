import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { HiOutlineDatabase } from 'react-icons/hi';
import {
  SiCassandra,
  SiMariadb,
  SiMongodb,
  SiMysql,
  SiNeo4J,
  SiPostgresql,
  SiRedis,
} from 'react-icons/si';
import { CreateDatabaseRequest } from '../../../network/protos';
import { ProjectContext } from '../../../stores/MeshContext';

const DBTypeList = [
  'Postgres',
  'MySQL',
  'MongoDB',
  'Neo4j',
  'MariaDB',
  'Cassandra',
  'Redis',
  'SQLite',
  'CouchDB',
];

interface DatabaseFormProps {
  description: string;
  label: string;
  onFormChange: (s: CreateDatabaseRequest) => void;
  data?: CreateDatabaseRequest;
}

export const DatabaseForm = observer(
  ({ onFormChange, label, description, data }: DatabaseFormProps) => {
    const ProjectStore = React.useContext(ProjectContext);
    const [DBType, setDBType] = React.useState<string>(
      data?.dbType ?? DBTypeList[0]
    );

    const setForm = () => {
      if (ProjectStore.selectedProject) {
        onFormChange({
          description,
          label,
          dbType: DBType,
          dbResources: [],
          projectId: ProjectStore.selectedProject!.id,
          type: 'DATABASE',
        });
      }
    };
    React.useEffect(() => {
      setForm();
    }, []);

    const getDBIcon = (db: string) => {
      if (db === 'Postgres') {
        return <SiPostgresql />;
      } else if (db === 'MySQL') {
        return <SiMysql />;
      } else if (db === 'MongoDB') {
        return <SiMongodb />;
      } else if (db === 'MariaDB') {
        return <SiMariadb />;
      } else if (db === 'Redis') {
        return <SiRedis />;
      } else if (db === 'Neo4j') {
        return <SiNeo4J />;
      } else if (db === 'Cassandra') {
        return <SiCassandra />;
      } else {
        return <HiOutlineDatabase />;
      }
    };

    const onSelectDBType = (db: string) => {
      setDBType(db);
      setForm();
    };

    return (
      <Box width="100%">
        <FormLabel color="gray.500">DB Type</FormLabel>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="100%">
            {DBType}
          </MenuButton>
          <MenuList>
            {DBTypeList.map((db) => (
              <MenuItem
                key={db}
                icon={getDBIcon(db)}
                onClick={() => {
                  onSelectDBType(db);
                }}
              >
                {db}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    );
  }
);
