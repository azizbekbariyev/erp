import { useState, useEffect } from "react";
import { Table, Button, Space, Card, message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useBranch } from "@hooks";
import type { BranchTypes } from "@types";
import { BranchModal } from "./brancheMadol";
import { PopConfirm } from "../../components";

export const Branches = () => {
  const [branches, setBranches] = useState<BranchTypes[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<BranchTypes[]>([]);
  const [searchText] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchTypes | null>(
    null
  );

  const {
    data: branchData,
    useBranchCreate,
    useBranchDelete,
    useBranchUpdate,
  } = useBranch();

  const { mutate: createMutation, isPending: isCreatePending } =
    useBranchCreate();
  const { mutate: updateMutation, isPending: isUpdatePending } =
    useBranchUpdate();
  const { mutate: deleteMutation, isPending: isDeletePending } =
    useBranchDelete();

  useEffect(() => {
    console.log("Branch data received:", branchData);

    if (branchData && branchData.data) {
      const branchesData =
        branchData.data.data?.branch ||
        branchData.data.branch ||
        branchData.data ||
        [];

        createMutation(branchesData);
      if (Array.isArray(branchesData)) {
        setBranches(branchesData);
      } else {
        console.log("Branches data is not array:", branchesData);
        setBranches([]);
      }
    } else {
      console.log("No branch data, setting empty array");
      setBranches([]);
    }
  }, [branchData]);

  useEffect(() => {
    let filtered = [...branches];
    if (searchText) {
      filtered = filtered.filter(
        (branch) =>
          branch.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          branch.address?.toLowerCase().includes(searchText.toLowerCase()) ||
          branch.call_number?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredBranches(filtered);
  }, [branches, searchText]);

  const handleDelete = (branch: any) => {
    deleteMutation(branch.id, {
      onSuccess: () => {
        message.success("Branch deleted successfully");
        setBranches((prev) => prev.filter((b: any) => b.id !== branch.id));
      },
      onError: (error) => {
        message.error("Error occurred while deleting branch");
        console.error("Delete error:", error);
      },
    });
  };

  const handleCreate = () => {
    setSelectedBranch(null);
    setModalOpen(true);
  };

  const handleUpdate = (branch: any) => {
    setSelectedBranch(branch);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedBranch(null);
  };

  const handleModalSubmit = (values: any) => {
    if (selectedBranch) {
      updateMutation({ id: selectedBranch.id, data: values });
    } else {
      createMutation(values);
    }
  };

  // const clearFilters = () => {
  //   setSearchText("");
  // };

  const columns = [
    {
      title: "ID",
      render: (_: any, __: any, index: number) => index + 1,
      width: 60,
    },
    {
      title: "Branch Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      width: 300,
    },
    {
      title: "Phone Number",
      dataIndex: "call_number",
      key: "call_number",
      render: (phone: string) => phone || "Unknown",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("en-US") : "Unknown",
      sorter: (a: any, b: any) =>
        new Date(a.created_at || "").getTime() -
        new Date(b.created_at || "").getTime(),
    },
    {
      title: "Actions",
      render: (_: any, record: BranchTypes) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
          />
          <PopConfirm
            handleDelete={() => handleDelete(record)}
            loading={isDeletePending}
          />
        </Space>
      ),
    },
  ];

  const isLoading = !branchData;

  if (isLoading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h3>Loading branches...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="flex justify-between">
        <h1 style={{ marginBottom: 20 }}>Branches</h1>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            New Branch
          </Button>
        </Space>
      </div>
      <Card>
        <Table
          dataSource={filteredBranches}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} branches`,
            position: ["bottomCenter"],
          }}
          locale={{
            emptyText:
              filteredBranches.length === 0 && branches.length > 0
                ? "No branches found"
                : "No branches available",
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Modal */}
      <BranchModal
        open={modalOpen}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
        branch={selectedBranch}
        loading={isCreatePending || isUpdatePending}
      />
    </div>
  );
};

export default Branches;
