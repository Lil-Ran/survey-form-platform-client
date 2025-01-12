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
  Select,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../../styles/surveyTable.module.css';
import dayjs from 'dayjs';
import { QRCodeCanvas } from 'qrcode.react';
import api,{SurveyInfoModel} from '@Api';
import searchSurvey from '/search.svg'
import sort_asc from '/sortasc.svg'
import sort_desc from '/sortdesc.svg'
import text_justify from '/textjustify.svg'
import setting from '/setting.svg'
import shareSurvey from '/shareSurvey.svg'
import deleteSurvey from '/deleteSurvey.svg'
import viewSurvey from '/previewSurvey.svg'
import surveyEdit from '/surveyEdit.svg'
import attribute from '/attribute.svg'
import { showNotification } from '@mantine/notifications'; // 引入通知库

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const icon = sorted ? (reversed ? sort_asc : sort_desc) : text_justify;
  const isSortable = !['问卷状态', '操作'].includes(children as string); // 判断是否允许排序

  return (
    <Table.Th className={classes.th}>
      {isSortable ? (
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group justify="center">
            <Text fw={500} fz="sm">
              {children}
            </Text>
            <Center className={classes.icon} style={{ marginLeft: 'auto' }}>
              <img src={icon} alt="sort icon" />
            </Center>
          </Group>
        </UnstyledButton>
      ) : (
        <Group justify="center">
          <Text fw={500} fz="sm">
            {children}
          </Text>
        </Group>
      )}
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

export function SurveyTable({ filter, handleMainLinkClick }: { filter: (row: SurveyInfoModel) => boolean, handleMainLinkClick: (link: { label: string, linksKey: string }) => void, setActiveLink: (link: string) => void }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof SurveyInfoModel>('createTime'); // 默认以创建时间排序
  const [reverseSortDirection, setReverseSortDirection] = useState(true); // 默认降序排列
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 15;
  const [modalOpened, setModalOpened] = useState(false);
  const [newSurveyTitle, setNewSurveyTitle] = useState('');
  const [shareModalOpened, setShareModalOpened] = useState(false); // 用于控制分享二维码Modal的状态
  const [shareLink, setShareLink] = useState(''); // 用于保存生成的分享链接
  const [data, setData] = useState<SurveyInfoModel[]>([]);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false); // 用于控制删除确认Modal的状态
  const [surveyToDelete, setSurveyToDelete] = useState<string | null>(null); // 用于保存待删除的问卷ID
  const navigate = useNavigate(); // 使用 useNavigate
  const [statusModalOpened, setStatusModalOpened] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyInfoModel | null>(null);
  const [surveyStatus, setSurveyStatus] = useState<string>('');

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await api.surveyManage.surveyList();
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setData(response.data.data as unknown as SurveyInfoModel[]);
          setSortedData(sortData(response.data.data as unknown as SurveyInfoModel[], { sortBy, reversed: reverseSortDirection, search })); // 设置排序后的数据
        } else {
          console.error('Unexpected response data format:', response);
        }
      } catch (error) {
        console.error('Failed to fetch surveys:', error);
      }
    };

    void fetchSurveys();
  }, [sortBy, reverseSortDirection, search]);

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
      showNotification({ title: '成功', message: '问卷创建成功', color: 'green' }); // 显示成功通知
      window.location.reload();
      } catch (error) {
      console.error('Failed to create survey:', error);
      showNotification({ title: '错误', message: '问卷创建失败', color: 'red' }); // 显示错误通知
    }
  }, [newSurveyTitle]);

  interface SwitchSurveyRequest {
    surveyId: string;
    status: string;
  }

  const handleDeleteSurvey = useCallback(async () => {
    if (!surveyToDelete) return;

    try {
      const requestData: SwitchSurveyRequest = {
        surveyId: surveyToDelete,
        status: "Deleted"
      };

      await api.surveyManage.surveySwitchCreate(requestData);
      const response = await api.surveyManage.surveyList();
      setData(response.data.data as unknown as SurveyInfoModel[]);
      showNotification({ title: '成功', message: '问卷删除成功', color: 'green' });
      setDeleteModalOpened(false);
      setSurveyToDelete(null);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete survey:', error);
      showNotification({ title: '错误', message: '问卷删除失败', color: 'red' }); // 显示错误通知
    }
  }, [surveyToDelete]);

  const handleSettingSurvey = useCallback(async () => {
    if (!selectedSurvey) return;

    try {
      const requestData: SwitchSurveyRequest = {
        surveyId: selectedSurvey.surveyId,
        status: surveyStatus,
      };

      await api.surveyManage.surveySwitchCreate(requestData);
      const response = await api.surveyManage.surveyList();
      setData(response.data.data as unknown as SurveyInfoModel[]);
      showNotification({ title: '成功', message: '状态更改成功', color: 'green' });
      setStatusModalOpened(false);
      setSelectedSurvey(null);
      window.location.reload();
    } catch (error) {
      console.error('Failed to change state:', error);
      showNotification({ title: '错误', message: '状态更改失败', color: 'red' }); // 显示错误通知
    }
  }, [selectedSurvey, surveyStatus]);


  const openDeleteModal = useCallback((surveyId: string) => {
    setSurveyToDelete(surveyId);
    setDeleteModalOpened(true);
  }, []);

  const generateShareLink = useCallback((surveyId: string) => {
    return `${window.location.protocol}//${window.location.host}/SurveyAnswer/${surveyId}`;
  }, []);

  const handleShareClick = useCallback((surveyId: string) => {
    const link = generateShareLink(surveyId);
    setShareLink(link);
    setShareModalOpened(true); // 打开分享Modal
  }, [generateShareLink]);


  const handleDesignClick = useCallback((surveyId: string) => {
    void navigate(`/SurveyEditor/${surveyId}`); // 跳转到问卷设计页面
  }, [navigate]);

  const handleDataClick = useCallback((surveyId: string) => {
    handleMainLinkClick({ label: '答卷中心', linksKey: 'answerCenter' });
    void navigate('/surveymain', { state: { surveyId, mainLink: 'answerCenter' } });
  }, [handleMainLinkClick, navigate]);

  const handleAnalysisClick = useCallback((surveyId: string) => {
    handleMainLinkClick({ label: '问卷分析', linksKey: 'surveyAnalysis' });
    void navigate('/surveymain', { state: { surveyId, mainLink: 'surveyAnalysis' } });
  }, [handleMainLinkClick, navigate]);

  const openStatusModal = useCallback((survey: SurveyInfoModel) => {
    setSelectedSurvey(survey);
    setSurveyStatus(survey.status);
    setStatusModalOpened(true);
  }, []);

  const filteredData = useMemo(() => sortedData.filter(filter), [sortedData, filter]);
  const paginatedData = useMemo(() => filteredData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage), [filteredData, activePage, itemsPerPage]);

  const rows = useMemo(() => paginatedData.map((row) => (
    <Table.Tr key={row.surveyId} >
      <Table.Td className={classes.tableTitle}>{row.title}</Table.Td>
      <Table.Td className={classes.tableStatus}>{statusMap[row.status]}</Table.Td>
      <Table.Td className={classes.tableResponseCount}>{row.responseCount}</Table.Td>
      <Table.Td className={classes.tableOwner}>{row.ownerName}</Table.Td>
      <Table.Td className={classes.tableCreateTime}>{dayjs(row.createTime).format('YYYY-MM-DD')}</Table.Td>
      <Table.Td className={classes.tableActions}>
        <Group gap="xs">
          <Tooltip label="属性" withArrow>
            <img src={setting} style={{ width: '17px', height: '17px' }} onClick={() => openStatusModal(row)} />
          </Tooltip>
          <Tooltip label="设计" withArrow>
            <img src={surveyEdit} style={{ width: '17px', height: '17px' }} onClick={() => handleDesignClick(row.surveyId)} />
          </Tooltip>
          <Tooltip label="分享" withArrow>
            <img src={shareSurvey} style={{ width: '17px', height: '17px' }} onClick={() => handleShareClick(row.surveyId)} />
          </Tooltip>
          <Tooltip label="答卷" withArrow>
            <img src={viewSurvey} style={{ width: '17px', height: '17px' }} onClick={() => handleDataClick(row.surveyId)} />
          </Tooltip>
          <Tooltip label="分析" withArrow>
            <img src={attribute} style={{ width: '17px', height: '17px' }} onClick={() => handleAnalysisClick(row.surveyId)} />
          </Tooltip>
          <Tooltip label="删除" withArrow>
            <img src={deleteSurvey} style={{ width: '17px', height: '17px' }} onClick={() => openDeleteModal(row.surveyId)} />
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  )), [paginatedData, handleShareClick, handleDesignClick, openDeleteModal, handleDataClick, handleAnalysisClick, openStatusModal]);

  return (
    <ScrollArea>
      <Group mb="md" justify="space-between">
        <TextInput
          placeholder="搜索问卷标题或问卷发布者"
          leftSection={<img src={searchSurvey} />}
          value={search}
          onChange={handleSearchChange}
          style={{ flex: 1, marginRight: '1rem' }}
        />
        <Button onClick={() => setModalOpened(true)} style={{ width: '200px' }}>创建问卷</Button>
      </Group>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" className={classes.table} striped highlightOnHover withTableBorder withColumnBorders>
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
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="确定要删除此问卷吗？"
        centered
      >
        <Group justify="space-around" mt="md">
          <Button onClick={() => { void handleDeleteSurvey(); }} style={{ width: '120px' }}>确认</Button>
          <Button variant="outline" onClick={() => setDeleteModalOpened(false)} style={{ width: '120px' }}>取消</Button>
        </Group>
      </Modal>
      <Modal
        opened={statusModalOpened}
        onClose={() => setStatusModalOpened(false)}
        title="设置问卷状态"
        centered
      >
        <Select
          label="问卷状态"
          value={surveyStatus}
          onChange={(value) => setSurveyStatus(value || '')}
          data={[
            { value: 'Ongoing', label: '正在收集' },
            { value: 'Suspended', label: '暂停收集' },
            { value: 'Locked', label: '等待收集' },
          ]}
        />
        <Group justify="space-around" mt="md">
          <Button onClick={() => { void handleSettingSurvey(); }} style={{ width: '120px' }}>保存</Button>
          <Button variant="outline" onClick={() => setStatusModalOpened(false)} style={{ width: '120px' }}>取消</Button>
        </Group>
      </Modal>
    </ScrollArea>
  );
}

export default SurveyTable;

