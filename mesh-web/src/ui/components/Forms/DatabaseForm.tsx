import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormLabel,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
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

export const DatabaseForm = () => {
  const [DBType, setDBType] = React.useState<string>(DBTypeList[0]);

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

  return (
    <Box width="100%">
      <FormLabel>
        <Heading color="gray.500" size="sm">
          DB Type
        </Heading>
      </FormLabel>
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
                setDBType(db);
              }}
            >
              {db}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
