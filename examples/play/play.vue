<template>
  <div ref="page" style="height: 100%">
    <el-bpmn :xml="xml" />
  </div>
</template>

<script>
import Vue from 'vue'
import E from 'main/index.js'
import TestTree from './tree/tree.vue'
Vue.use(E.Loading.directive)
export default {
  components: {
    ElProgress: E.Progress,
    ElBpmnViewer: E.BpmnViewer,
    ElBpmn: E.Bpmn,
    ElTree: E.Tree,
    ElTable: E.Table,
    ElForm: E.Form,
    ElInput: E.Input,
    ElInputNumber: E.InputNumber,
    ElBtn: E.Btn,
    ElTimePicker: E.TimePicker,
    ElDatePicker: E.DatePicker,
    ElSlider: E.Slider,
    ElCascader: E.Cascader,
    ElCheckboxGroup: E.CheckboxGroup,
    ElRadioGroup: E.RadioGroup,
    ElCheckboxButton: E.CheckboxButton,
    ElRadio: E.Radio,
    ElSwitch: E.Switch,
    ElSelect: E.Select,
    ElFormItem: E.FormItem,
    PS: E.PerfectScrollbar,
    ElDialog: E.Dialog,
    ElSection: E.Section,
    ElPage: E.Page,
    ElTableSelect: E.TableSelect,
    TestTree
  },

  data: () => ({
    visible: false,
    form: {
      test: ['1407259261091844098']
    },

    xml: `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:extA1="http://www.a1bpm.com/schema/1.0/A1" xmlns:A1Category="http://a1bpm.category/schema/bpmn/ExtCategory/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="definitions_17m7czq" targetNamespace="all" A1Category:categoryId="20074" A1Category:title="默认流程">
          <extA1:ExtProperties id="ExtProperties_1pzqvmq" />
          <extA1:Buttons id="Buttons_12pbb5b" />
          <extA1:UserRules id="UserRules_1ei2q83">
            <extA1:UserRule id="UserRule_1wtwjx3" nodeId="UserTask_1mwpltf" pluginType="users" pluginVal="" logicCal="" ruleId="start" ruleVal="" ruleDisplayName="[发起人]" specId="" />
          </extA1:UserRules>
          <extA1:UserPropertyes id="UserPropertyes_0mx5h1d" />
          <extA1:Globals id="Globals_1rkyzbr" />
          <extA1:VariableDefs id="VariableDefs_0ackb0k" />
          <extA1:Conditions id="Conditions_1r12rhe" />
          <extA1:CommonScripts id="CommonScripts_0f1qqdw" />
          <extA1:SignNodes id="SignNodes_0f1qqdw" />
          <extA1:GlobalForms id="GlobalForms_0f1qqdw">
            <extA1:GlobalForm id="GlobalForm_0i2tp26" formValue="WGBD" name="WGBD" parentFlowKey="frame" type="frame" />
          </extA1:GlobalForms>
          <extA1:ExtAttributes id="ExtAttributes_0f1qqd2" />
          <bpmn:process id="yssp" name="预算审批" isExecutable="true">
            <bpmn:documentation>预算审批</bpmn:documentation>
            <bpmn:startEvent id="StartEvent_1" name="开始" activiti:initiator="startUser">
              <bpmn:outgoing>SequenceFlow_0s0pm4g</bpmn:outgoing>
            </bpmn:startEvent>
            <bpmn:userTask id="UserTask_1mwpltf" name="用户任务1">
              <bpmn:incoming>SequenceFlow_0s0pm4g</bpmn:incoming>
              <bpmn:outgoing>SequenceFlow_0ysh19c</bpmn:outgoing>
            </bpmn:userTask>
            <bpmn:sequenceFlow id="SequenceFlow_0s0pm4g" sourceRef="StartEvent_1" targetRef="UserTask_1mwpltf" />
            <bpmn:endEvent id="EndEvent_01atgok" name="结束1">
              <bpmn:incoming>SequenceFlow_0ysh19c</bpmn:incoming>
            </bpmn:endEvent>
            <bpmn:sequenceFlow id="SequenceFlow_0ysh19c" sourceRef="UserTask_1mwpltf" targetRef="EndEvent_01atgok" />
          </bpmn:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="yssp">
              <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
                <dc:Bounds x="179" y="159" width="36" height="36" />
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="186" y="195" width="22" height="14" />
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="UserTask_1mwpltf_di" bpmnElement="UserTask_1mwpltf">
                <dc:Bounds x="270" y="137" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="SequenceFlow_0s0pm4g_di" bpmnElement="SequenceFlow_0s0pm4g">
                <di:waypoint x="215" y="177" />
                <di:waypoint x="270" y="177" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNShape id="EndEvent_01atgok_di" bpmnElement="EndEvent_01atgok">
                <dc:Bounds x="432" y="159" width="36" height="36" />
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="436" y="198" width="28" height="14" />
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="SequenceFlow_0ysh19c_di" bpmnElement="SequenceFlow_0ysh19c">
                <di:waypoint x="370" y="177" />
                <di:waypoint x="432" y="177" />
              </bpmndi:BPMNEdge>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </bpmn:definitions>
    `,


  }),


}
</script>

<style lang="scss">
body,
html {
  height: 100%;
}
</style>
