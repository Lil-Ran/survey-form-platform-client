import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Pagination,
  Button,
  Modal,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import classes from '../../styles/SurveyMainStyles.module.css';
import dayjs from 'dayjs';
import { QRCodeCanvas } from 'qrcode.react';  // 引入QRCode库
import SurveyPreview from '../../pages/SurveyPreview'; // 引入SurveyPreview组件
import { mdiArrowDown, mdiArrowUp, mdiArrowUpDown, mdiDatabase, mdiEye, mdiMagnify, mdiPencil, mdiSettingsHelper, mdiShare, mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';
import api,{SurveyInfoModel,SurveyStatus} from '@Api';


interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const icon = sorted ? (reversed ? mdiArrowUp : mdiArrowDown) : mdiArrowUpDown
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon path={icon} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function keys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

function filterData(data: SurveyInfoModel[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      ['title', 'ownerName'].includes(key as string) && item[key] != null && typeof item[key] === 'string' && item[key].toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: SurveyInfoModel[],
  payload: { sortBy: keyof SurveyInfoModel | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

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


export function SurveyTable({ filter }: { filter: (row: SurveyInfoModel) => boolean }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof SurveyInfoModel | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 15;
  const [modalOpened, setModalOpened] = useState(false);
  const [newSurveyTitle, setNewSurveyTitle] = useState('');
  const [shareModalOpened, setShareModalOpened] = useState(false); // 用于控制分享二维码Modal的状态
  const [shareLink, setShareLink] = useState(''); // 用于保存生成的分享链接
  const [previewModalOpened, setPreviewModalOpened] = useState(false); // 用于控制预览Modal的状态
  const [previewSurvey, setPreviewSurvey] = useState<SurveyInfoModel | null>(null); // 用于保存预览的问卷数据
  const [data, setData] = useState<SurveyInfoModel[]>([]);
  const navigate = useNavigate(); // 使用 useNavigate

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await api.surveyManage.surveyList();
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setData(response.data.data as unknown as SurveyInfoModel[]);
          setSortedData(response.data.data as unknown as SurveyInfoModel[]); // 设置排序后的数据
        } else {
          console.error('Unexpected response data format:', response);
        }
      } catch (error) {
        console.error('Failed to fetch surveys:', error);
      }
    };

    void fetchSurveys();
  }, []);

  const [sortedData, setSortedData] = useState(data);

  const setSorting = useCallback((field: keyof SurveyInfoModel) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  }, [sortBy, reverseSortDirection, search, data]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  }, [sortBy, reverseSortDirection, data]);

  const handleCreateSurvey = useCallback(async () => {
    try {
      const newSurvey = { title: newSurveyTitle };
      await api.surveyManage.surveyCreateCreate(newSurvey);
      const response = await api.surveyManage.surveyList();
      setData(response.data.data as unknown as SurveyInfoModel[]);
      setModalOpened(false);
    } catch (error) {
      console.error('Failed to create survey:', error);
    }
  }, [newSurveyTitle]);

  interface SwitchSurveyRequest {
    surveyId: string;
    status: string;
  }

  const handleDeleteSurvey = useCallback(async (surveyId: string, status: string) => {
    try {
      const requestData: SwitchSurveyRequest = {
        surveyId,
        status
      };
  
      await api.surveyManage.surveySwitchCreate(requestData);
      const response = await api.surveyManage.surveyList();
      setData(response.data.data as unknown as SurveyInfoModel[]);
    } catch (error) {
      console.error('Failed to delete survey:', error);
    }
  }, []);

  const generateShareLink = useCallback((surveyId: string) => {
    // return `https://survey/${surveyId}`; // 这里用实际的链接替换
    return `http://localhost:63000/SurveyAnswer/${surveyId}`; // 生成本地测试用的链接
  }, []);

  const handleShareClick = useCallback((surveyId: string) => {
    const link = generateShareLink(surveyId);
    setShareLink(link);
    setShareModalOpened(true); // 打开分享Modal
  }, [generateShareLink]);

  const handlePreviewClick = useCallback((survey: SurveyInfoModel) => {
    setPreviewSurvey(survey);
    setPreviewModalOpened(true); // 打开预览Modal
  }, []);

  const handleDesignClick = useCallback((surveyId: string) => {
    navigate(`/SurveyEditor/${surveyId}`); // 跳转到问卷设计页面
  }, [navigate]);

  const filteredData = useMemo(() => sortedData.filter(filter), [sortedData, filter]);
  const paginatedData = useMemo(() => filteredData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage), [filteredData, activePage, itemsPerPage]);

  const rows = useMemo(() => paginatedData.map((row) => (
    <Table.Tr key={row.surveyId}>
      <Table.Td className={classes.tableTitle}>{row.title}</Table.Td>
      <Table.Td className={classes.tableStatus}>{statusMap[row.status]}</Table.Td>
      <Table.Td className={classes.tableResponseCount}>{row.responseCount}</Table.Td>
      <Table.Td className={classes.tableOwner}>{`${row.ownerName} (${row.ownerId})`}</Table.Td>
      <Table.Td className={classes.tableCreateTime}>{dayjs(row.createTime).format('YYYY-MM-DD')}</Table.Td>
      <Table.Td className={classes.tableActions}>
        <Group gap="xs">
          <Tooltip label="属性" withArrow>
            <ActionIcon><Icon path={mdiSettingsHelper} /></ActionIcon>
          </Tooltip>
          <Tooltip label="设计" withArrow>
            <ActionIcon onClick={() => handleDesignClick(row.surveyId)}><Icon path={mdiPencil} /></ActionIcon>
          </Tooltip>
          <Tooltip label="预览" withArrow>
            <ActionIcon
              onClick={() => handlePreviewClick(row)} // 点击预览按钮时触发
            >
              <Icon path={mdiEye} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="分享" withArrow>
            <ActionIcon
              onClick={() => handleShareClick(row.surveyId)} // 点击分享按钮时触发
            >
              <Icon path={mdiShare} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="数据" withArrow>
            <ActionIcon><Icon path={mdiDatabase} /></ActionIcon>
          </Tooltip>
          <Tooltip label="删除" withArrow>
            <ActionIcon onClick={() => { void handleDeleteSurvey(row.surveyId,"Deleted"); }}><Icon path={mdiTrashCan} /></ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  )), [paginatedData, handlePreviewClick, handleShareClick, handleDesignClick, handleDeleteSurvey]);

  return (
    <ScrollArea>
      <Group mb="md" justify="space-between">
        <TextInput
          placeholder="搜索问卷标题或问卷发布者"
          leftSection={<Icon path={mdiMagnify} />}
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
                onSort={() => setSorting(key as keyof SurveyInfoModel)}
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
          <Button onClick={() => { void handleCreateSurvey(); }} style={{ width: '120px' }}>创建</Button>
          <Button variant="outline" onClick={() => setModalOpened(false)} style={{ width: '120px' }}>取消</Button>
        </Group>
      </Modal>
      <Modal
        opened={shareModalOpened}
        onClose={() => setShareModalOpened(false)}
        title="分享问卷"
        centered
        size={600} // 使用自定义的像素值
      >
      <Group align="center">
        <Text size="sm" mb="md">
          扫描二维码或复制链接分享此问卷：
        </Text>
        {/* 生成二维码 */}
        <Center>
          {shareLink && (
            <QRCodeCanvas
              value={shareLink}
              size={512} // 设置二维码大小
              level="M" // 纠错等级，可选 "L", "M", "Q", "H"
              includeMargin // 是否包括二维码的外边距
            />
          )}
        </Center>
        <TextInput
          value={shareLink}
          readOnly
          mt="md"
          label="分享链接"
          description="点击复制链接"
          style={{ width: '80%' }} // 设置宽度为父容器的 100%
          rightSection={
            <div style={{ width: '5px' }}> {/* 包裹按钮并控制宽度 */}
              <Button size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(shareLink)
                    .then(() => alert('复制成功'))
                    .catch((err) => console.error('复制失败', err));
                }}>
                复制
              </Button>
            </div>
          }
        />
      </Group>
    </Modal>
    <Modal
        opened={previewModalOpened}
        onClose={() => setPreviewModalOpened(false)}
        title="问卷预览"
        centered
        size="lg"
      >
        {previewSurvey && <SurveyPreview survey={previewSurvey} />}
      </Modal>
    </ScrollArea>
  );
}

export default SurveyTable;

