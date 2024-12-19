import { useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconSettings, IconEdit, IconEye, IconShare, IconDatabase, IconTrash } from '@tabler/icons-react';
import {
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Pagination,
  Button,
  Modal,
  Tooltip,
} from '@mantine/core';
import classes from '../styles/surveyTableSort.module.css';
import dayjs from 'dayjs';

interface RowData {
  surveyId: string;
  accessId: string;
  title: string;
  status: string;
  responseCount: number;
  ownerId: string;
  ownerName: string;
  createTime: string;
  lastUpdateTime: string;
  lastUpdataUserID: string;
  lastUpdateUserName: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp as React.ElementType : IconChevronDown as React.ElementType) : IconSelector as React.ElementType;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      ['title', 'ownerName'].includes(key) && item[key].toString().toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy].toString());
      }

      return a[sortBy].toString().localeCompare(b[sortBy].toString());
    }),
    payload.search
  );
}

// TODO 转为后端实现
const exampleRow: RowData = {
  surveyId: '1',
  accessId: '2',
  title: '中山大学大山中',
  status: 'Ongoing',
  responseCount: 0,
  ownerId: '001',
  ownerName: '张三丰',
  createTime: '2023-12-28',
  lastUpdateTime: '2024-11-15',
  lastUpdataUserID: '0000',
  lastUpdateUserName: '李四爷',
};

const data: RowData[] = Array.from({ length: 50 }, (_, index) => ({
  ...exampleRow,
  surveyId: (index + 1).toString(), // 确保每个对象的 surveyId 唯一

}));

const columnHeaders = {
  title: '标题',
  status: '问卷状态',
  responseCount: '收集数量',
  owner: '发布者',
  createTime: '创建时间',
  actions: '操作',
};

const statusMap: { [key: string]: string } = {
  Ongoing: '正在收集',
  Suspended: '暂停收集',
  OutOfTime: '不在收集时间',
  OutOfCount: '超过收集上限',
  Locked: '正在设计',
  Deleted: 'Deleted',
};

export function TableSort({ filter }: { filter: (row: RowData) => boolean }) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 15;
  const [modalOpened, setModalOpened] = useState(false);
  const [newSurveyTitle, setNewSurveyTitle] = useState('');

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const handleCreateSurvey = () => {
    // 处理创建问卷的逻辑
    console.log('创建问卷:', newSurveyTitle);
    setModalOpened(false);
  };

  const filteredData = sortedData.filter(filter);
  const paginatedData = filteredData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  const rows = paginatedData.map((row) => (
    <Table.Tr key={row.surveyId}>
      <Table.Td className={classes.tableTitle}>{row.title}</Table.Td>
      <Table.Td className={classes.tableStatus}>{statusMap[row.status]}</Table.Td>
      <Table.Td className={classes.tableResponseCount}>{row.responseCount}</Table.Td>
      <Table.Td className={classes.tableOwner}>{`${row.ownerName} (${row.ownerId})`}</Table.Td>
      <Table.Td className={classes.tableCreateTime}>{dayjs(row.createTime).format('YYYY-MM-DD')}</Table.Td>
      <Table.Td className={classes.tableActions}>  
        <Group gap="xs">
          <Tooltip label="属性" withArrow>
            <Button variant="subtle" size="compact-xs"><IconSettings size={16} /></Button>
          </Tooltip>
          <Tooltip label="设计" withArrow>
            <Button variant="subtle" size="compact-xs"><IconEdit size={16} /></Button>
          </Tooltip>
          <Tooltip label="预览" withArrow>
            <Button variant="subtle" size="compact-xs"><IconEye size={16} /></Button>
          </Tooltip>
          <Tooltip label="分享" withArrow>
            <Button variant="subtle" size="compact-xs"><IconShare size={16} /></Button>
          </Tooltip>
          <Tooltip label="数据" withArrow>
            <Button variant="subtle" size="compact-xs"><IconDatabase size={16} /></Button>
          </Tooltip>
          <Tooltip label="删除" withArrow>
            <Button variant="subtle" size="compact-xs"><IconTrash size={16} /></Button>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Group mb="md" justify="space-between">
        <TextInput
          placeholder="搜索问卷标题或问卷发布者"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          style={{ flex: 1, marginRight: '1rem' }}
        />
        <Button onClick={() => setModalOpened(true)} style={{ width: '150px' }}>创建问卷</Button>
      </Group>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" className={classes.table}>
        <Table.Tbody>
          <Table.Tr>
            {Object.keys(columnHeaders).map((key) => (
              <Th
                key={key}
                sorted={sortBy === key}
                reversed={reverseSortDirection}
                onSort={() => setSorting(key as keyof RowData)}
              >
                {columnHeaders[key as keyof typeof columnHeaders]}
              </Th>
            ))}
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(columnHeaders).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <Center mt="md">
        <Pagination
          total={Math.ceil(filteredData.length / itemsPerPage)}
          value={activePage}
          onChange={setActivePage}
        />
      </Center>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="创建新问卷"
        centered
      >
        <TextInput
          placeholder="问卷标题"
          value={newSurveyTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewSurveyTitle(event.currentTarget.value)}
        />
        <Group justify="space-around" mt="md">
          <Button onClick={handleCreateSurvey} style={{ width: '120px' }}>创建</Button>
          <Button variant="outline" onClick={() => setModalOpened(false)} style={{ width: '120px' }}>取消</Button>
        </Group>
      </Modal>
    </ScrollArea>
  );
}