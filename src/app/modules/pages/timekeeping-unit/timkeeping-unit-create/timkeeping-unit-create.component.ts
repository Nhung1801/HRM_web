import { Component } from '@angular/core';
import { OrganiStructTypeService } from 'src/app/core/services/organi-struct-type.service';
import { TimekeepingLocationService } from 'src/app/core/services/timekeepingLocation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimekeepingUnitService } from 'src/app/core/services/timekeepingUnit.service';
import { Toast } from 'primeng/toast';
import { ToastService } from 'src/app/core/services/global/toast.service';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
@Component({
    selector: 'app-timkeeping-unit-create',
    templateUrl: './timkeeping-unit-create.component.html',
    styleUrl: './timkeeping-unit-create.component.scss',
})
export class TimkeepingUnitCreateComponent {
    listSelected: any;
    listSoftware: any;
    listSelectTask: any[] = [
        { label: 'Cố định', value: 0 },
        { label: 'Không cố định', value: 1 },
    ];
    listSelectEmployee: any[] = [
        { label: 'Toàn bộ công ty', value: 0 },
        { label: 'Chỉ áp dụng cho các nhân viên được chọn', value: 1 },
    ];
    statusEmployee: number;
    listLocation: any[];
    idLocation: any;
    disableLocation: boolean;
    listAllcompany: any;
    nodes: any[] = [];
    isParentUnitClicked: boolean;
    isParentUnitInvalid: boolean;
    organizatioParentIdObject: any[];
    methodkeeping: any;
    methodStatus: any;
    isParentUnitInvalid1: boolean;
    isParentUnitInvalid2: boolean;
    createForm: FormGroup;
    testValue: any;
    timekeepingSettingId: number;
    idSoftware: number;
    idoraganization: number;
    constructor(
        private location: TimekeepingLocationService,
        private organiServer: OrganiStructTypeService,
        private organistruct: OrganiStructTypeService,
        private fb: FormBuilder,
        private timekeepingUnit: TimekeepingUnitService,
        private toast: ToastService,
        private authService: AuthService,
        private route: Router,
        private messageService: MessageService
    ) {
        this.createForm = this.fb.group({
            organizatioParentIdObject: [null, Validators.required],
            methodkeeping: [null, Validators.required],
            methodStatus: [null, Validators.required],
            idLocation: [null, Validators.required],
            statusEmployee: [null, Validators.required],
            statusLocation: [0, Validators.required],
        });
    }
    ngOnInit() {
        this.listSelected = [
            {
                label: 'Xác thực bằng khuôn mặt',
                value: 1,
            },
            {
                label: 'Đính kèm tài liệu xác thực',
                value: 2,
            },
            {
                label: 'Yêu cầu quản lý xác nhận',
                value: 3,
            },
        ];
        this.listSoftware = [
            {
                label: 'Ứng dụng web',
                value: 1,
            },
            {
                label: 'Ứng dụng mobile',
                value: 2,
            },
            {
                label: 'Cả 2',
                value: 3,
            },
        ];
        this.methodkeeping = [
            {
                label: 'Định vị GPS',
                value: 0,
            },
            {
                label: 'Máy chấm công',
                value: 1,
            },
        ];
        this.testValue = [
            {
                value: 2,
            },
            {
                value: 3,
            },
            {
                value: 4,
            },
            {
                value: 5,
            },
            {
                value: 6,
            },
            {
                value: 7,
            },
            {
                value: 8,
            },
        ];

        const resquest = {
            pageIndex: 1,
            pageSize: 10000,
        };
        this.location.getAll(resquest).subscribe((res) => {
            this.listLocation = res.items;
        });
        this.statusEmployee = 0;

        this.authService.userCurrent.subscribe((user) => {
            this.idoraganization = user.organization.id;
            const selectedNode = this.findNodeById(
                this.idoraganization,
                this.nodes
            );
            if (selectedNode) {
                this.organizatioParentIdObject = selectedNode;
            } else {
                this.organizatioParentIdObject = null;
            }
        });
        this.listCompany();
    }
    //  dang sách công ty đăng nhập
    listCompany() {
        const request = { Id: this.idoraganization };
        this.organistruct.getOrganiStructType(request.Id).subscribe((res) => {
            if (res && res.data) {
                this.listAllcompany = [this.convertToTree(res.data)];
            } else {
                this.listAllcompany = [];
            }
            this.listCompanyToTreeSelect();
        });
    }
    convertToTree(node: any): any {
        return {
            label: node.organizationName,
            data: node.id,
            children: (node.organizationChildren || []).map((child: any) =>
                this.convertToTree(child)
            ),
        };
    }

    mapToTreeNode(node: any): any {
        return {
            label: node.label,
            data: node.data,
            children: node.children || [],
        };
    }

    listCompanyToTreeSelect() {
        if (Array.isArray(this.listAllcompany)) {
            this.nodes = this.listAllcompany.map((company) =>
                this.mapToTreeNode(company)
            );
        } else {
            console.error(
                'listCompany không phải là mảng',
                this.listAllcompany
            );
        }
    }
    handleTreeSelectFocusOut(event: FocusEvent) {
        const target = event.relatedTarget as HTMLElement;
        const isInsideTreeSelect = target?.closest('.custom-tree-select');
        const isDropDowpLocation = target?.closest('.dropdown-locaion');
        const isDropDowpMethod = target?.closest('.dropdown-method');
    
        // Chỉ thực thi khi không phải focusout từ các dropdown khác
        if (!isInsideTreeSelect && !isDropDowpLocation && !isDropDowpMethod) {
            this.validateParentUnit(
                'isParentUnitInvalid',
                this.createForm.get('organizatioParentIdObject')?.value
            );
            this.validateParentUnit(
                'isParentUnitInvalid1',
                this.createForm.get('idLocation')?.value
            );
            this.validateParentUnit(
                'isParentUnitInvalid2',
                this.createForm.get('methodStatus')?.value
            );
    
            const organizatioParentIdObjectValue = this.createForm.get('organizatioParentIdObject')?.value;
    
            // Gọi API chỉ khi giá trị của organizatioParentIdObject thay đổi và hợp lệ
            if (Array.isArray(organizatioParentIdObjectValue) && organizatioParentIdObjectValue.length > 0) {
                const firstData = organizatioParentIdObjectValue[0]?.data;
                if (firstData) {
    
                    this.timekeepingUnit
                        .getTimekeepingSettingID(this.idoraganization)
                        .subscribe((res) => {
                            this.timekeepingSettingId = res.items?.[0]?.id;
                        });
                }
            }
        }
    
        this.nodes = this.updateNodeStatus(this.nodes);
    }
    
    validateParentUnit(stateKey: string, value: any) {
        this[stateKey] = !value || value.length === 0;
    }
    onParentUnitChange(event: any, validationField: string) {
        // Không gán lại nodes hoàn toàn, chỉ cập nhật trạng thái
        // const node = this.findNodeById( event.node.id,this.nodes);
        // if (node) {
        //     node.checked = event.checked;
        // }

        this.validateParentUnit(
            validationField,
            this.createForm.get('organizatioParentIdObject').value
        );
    }
    isFixedLocation(): boolean {
        this.createForm.get('statusLocation').value ===  null;
        return this.createForm.get('statusLocation').value === 0;
    }
    handleCreate() {
        const res = {
            organizationId: this.createForm.get('organizatioParentIdObject')?.value[0]?.data,
            timekeepingLocationOption: this.createForm.get('statusLocation').value,
            timekeepingLocationId: this.createForm.get('idLocation')?.value?.id || null
                ? this.createForm.get('idLocation').value.id
                : null,
            timekeepingSettingId: this.timekeepingSettingId,
            timekeepingType: this.createForm.get('methodStatus')?.value?.value,
        };
        
        this.timekeepingUnit.createUnit(res).subscribe((res) => {
            if (res) {
                this.createForm.reset();
                this.route.navigate(['/timekeeping'], { queryParams: { page: 'tracking' } });
                this.messageService.add({'severity':'success','summary':'Thành công','detail':'Thêm đơn vị thành công'});
            } else {
                this.messageService.add({'severity':'warn','summary':'Thông báo','detail':'Thêm đơn vị tất bại'});
            }
        });
    }
    updateNodeStatus(nodes: any[]): any[] {
        return nodes.map((node) => {
            const isInTestValue = this.testValue.some(
                (item) => item.value === node.data
            );
            node.selectable = !isInTestValue;
            // node.selected = isInTestValue;
            if (node.children && node.children.length > 0) {
                node.children = this.updateNodeStatus(node.children);
            }
            return node;
        });
    }
  
    findNodeById(id: number, nodes: any[]): any {
        for (const node of nodes) {
            if (node.data === id) {
                return node;
            }
            if (node.children) {
                const found = this.findNodeById(id, node.children);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }
}
