<template>
  <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
    <el-form-item label="项目名称">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="项目ID">
      <el-input v-model="formLabelAlign.region"></el-input>
    </el-form-item>
    <el-form-item class="panel_">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            项目名称：
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </template>
          <el-tree
            :data="treedata"
            show-checkbox
            default-expand-all
            class="trees"
            node-key="id"
            ref="tree"
            highlight-current
          ></el-tree>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback">
          <template slot="title">
            项目名称：
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </template>
          <el-tree
            :data="treedata"
            show-checkbox
            default-expand-all
            class="trees"
            node-key="id"
            ref="tree"
            highlight-current
          ></el-tree>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency">
          <template slot="title">
            项目名称：
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </template>
          <el-tree
            :data="treedata"
            show-checkbox
            default-expand-all
            class="trees"
            node-key="id"
            ref="tree"
            highlight-current
          ></el-tree>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability">
          <template slot="title">
            项目名称：
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </template>
          <el-tree
            :data="treedata"
            show-checkbox
            default-expand-all
            class="trees"
            node-key="id"
            ref="tree"
            highlight-current
          ></el-tree>
        </el-collapse-item>
      </el-collapse>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      activeName: "first",
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      treedata: [
        {
          id: 1,
          label: "人员管理",
          children: [
            {
              id: 9,
              label: "查看"
            },
            {
              id: 10,
              label: "编辑"
            },
            {
              id: 11,
              label: "删除"
            }
          ]
        },
        {
          id: 1,
          label: "考勤管理",
          children: [
            {
              id: 9,
              label: "查看"
            },
            {
              id: 10,
              label: "编辑"
            },
            {
              id: 11,
              label: "删除"
            }
          ]
        },
        {
          id: 1,
          label: "环境监测",
          children: [
            {
              id: 9,
              label: "查看"
            },
            {
              id: 10,
              label: "编辑"
            },
            {
              id: 11,
              label: "删除"
            }
          ]
        },
        {
          id: 1,
          label: "视频中心",
          children: [
            {
              id: 9,
              label: "查看"
            },
            {
              id: 10,
              label: "编辑"
            },
            {
              id: 11,
              label: "删除"
            }
          ]
        },
        {
          id: 1,
          label: "安全管理",
          children: [
            {
              id: 9,
              label: "查看"
            },
            {
              id: 10,
              label: "编辑"
            },
            {
              id: 11,
              label: "删除"
            }
          ]
        },
        {
          id: 1,
          label: "晨会签到",
          children: [
            {
              id: 9,
              label: "查看"
            },
            {
              id: 10,
              label: "编辑"
            },
            {
              id: 11,
              label: "删除"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="less" scoped>
// /deep/.el-dialog{
//   width:62% !important;
// }
.el-tabs {
  padding-top: 10px !important;
}
/deep/.el-form-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  /deep/.el-form-item__label {
    width: 140px !important;
  }
  /deep/.el-form-item__content {
    margin-left: 10px !important;
    width: 70%;
  }
}

.input_imp {
  /deep/.el-input {
    width: 100px;
  }
  .select_input {
    width: 59%;
  }
}
.input_imps {
  width: 40%;
  /deep/.el-form-item__content {
    margin-left: 10px !important;
    width: 60%;
    /deep/.el-input {
      width: 100%;
    }
  }
}
.input_imps2 {
  width: 40%;
  /deep/.el-form-item__content {
    margin-left: 10px !important;
    width: 56%;
    /deep/.el-input {
      width: 100%;
    }
  }
}
.XinXi {
  width: 100%;
  height: 30px;
  background: #ebeef5;
  line-height: 30px;
  text-indent: 20px;
  margin-bottom: 20px;
}
.HuoDong {
  /deep/.el-select {
    width: 100%;
    /deep/.el-input__inner {
      width: 100%;
    }
  }
}
.list_my {
  width: 45%;
  /deep/.el-form-item__content {
    width: 60%;
  }
}
.mys {
  /deep/.el-form-item__label {
    width: 100px !important;
  }
}
/deep/.el-form {
  height: 480px !important;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-right: 10px;
}
.certificates {
  width: 100%;
  height: 100px;
  border: 1px solid #e4e7ed;
}
/deep/.el-upload {
  width: 50px !important;
  height: 50px !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  // margin-top: 10px;
}
/deep/.el-upload-list__item-thumbnail {
  width: 50px !important;
  height: 50px !important;
}
.divone {
  height: 70px;
  /deep/.el-upload-list {
    height: 70px;
    float: left;
    margin-left: 10px;
    /deep/.el-upload-list__item {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
//*********************************//
/deep/.el-collapse {
  width: 100%;
}
.panel_ {
  width: 100%;
  padding-left: 9%;
  box-sizing: border-box;
  /deep/.el-form-item__content {
    width: 88% !important;
  }
}
/deep/.el-tree-node__content {
  width: 30% !important;
}
/deep/.el-collapse-item__content {
  display: flex;
  flex-direction: row;
  width: 100% !important;
  /deep/.el-tree {
    flex: 1.2;
    flex-wrap: wrap;
  }
}

.trees {
  display: flex;
  flex-direction: row;
}
/deep/.el-select {
  width: 220px;
  height: 30px;

  /deep/.el-input {
    width: 100%;
    height: 100%;

    /deep/.el-input__inner {
      width: 100%;
      height: 100%;
    }
  }
}
/deep/.el-tree-node {
  margin-left: 26px;
  /deep/.el-tree-node__content {
    padding-left: 10px !important;
  }
}
/deep/.el-collapse-item__header {
  height: 49px !important;
  display: block;
  background: #ebeef5;
  padding-left: 12px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
/deep/.el-collapse-item__arrow {
  width: auto;
  height: 49px;
  line-height: 49px;
  float: right;
}
/deep/.el-select__caret {
  height: 30px;
  line-height: 30px;
}
</style>