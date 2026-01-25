import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { LeaveApplicationService } from 'src/app/core/services/leave-application.service';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessageService, SelectItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { DialogModule } from 'primeng/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveApplicationStatus } from 'src/app/core/enums/leave-application-status.enum';
import { DatePipe } from '@angular/common';
import { OrganiStructTypeService } from 'src/app/core/services/organi-struct-type.service';
import pagingConfig, {
	DEFAULT_PAGE_INDEX,
	DEFAULT_PAGE_SIZE,
	DEFAULT_PAGE_SIZE_OPTIONS,
	DEFAULT_PER_PAGE_OPTIONS,
} from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { an } from '@fullcalendar/core/internal-common';
import { UtilityModule } from 'src/app/core/modules/utility/utility.module';
import { ConfirmDialogComponent } from 'src/app/core/modules/confirm-dialog/confirm-dialog.component';
import { ShiftWorkService } from 'src/app/core/services/shift-work.service';
import { CheckinCheckoutService } from 'src/app/core/services/checkin-checkout.service';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';

@Component({
	selector: 'app-approve-leave-application',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TableModule,
		CheckboxModule,
		ButtonModule,
		PaginatorModule,
		InputTextModule,
		DropdownModule,
		ToolbarModule,
		BreadcrumbModule,
		TreeSelectModule,
		DialogModule,
		FormsModule,
		AutoCompleteModule,
		UtilityModule,
		CalendarModule,
		MessagesModule
	],
	providers: [DatePipe],
	templateUrl: './approve-leave-application.component.html',
	styleUrl: './approve-leave-application.component.scss'
})
export class ApproveLeaveApplicationComponent implements OnInit {
	//enum
	leaveApplicationStatus = LeaveApplicationStatus;
	//var
	leaveApplications: any[];
	selectedLeaveApplications: any[] = [];
	breadcrumbs: any[];
	statuses: SelectItem[];
	organizations: any[] = [];
	employees: any[];
	user: any;
	dialogMessage: any = '';
	approverIds: any[] = [];
	employeess: any[] = [];
	represenSigning: any[] = [];
	units: any[] = [];
	shiftWorks: any[] = [];
	showCheckIn = false;
	showCheckOut = false;
	pageSize: number = 30;
	pageIndex: number = 1;
	displayDialog = false;
	checkInForm: FormGroup;
	showEmojiPicker = false;
	messages: any[] = [];
    emojiList = ['😀', '😂', '😍', '😎', '🤔', '😭', '😡', '🥳', '😜', '😇'];
	//search
	public paging: any = {
		pageIndex: DEFAULT_PAGE_INDEX,
		pageSize: DEFAULT_PAGE_SIZE,
		sortBy: '',
		orderBy: '',
		totalRecords: 0,
		totalPages: 0,
	};
	public config: any = {
		paging: pagingConfig.default,
		baseUrl: systemConfig.baseFileSystemUrl,
		perPageOptions: DEFAULT_PER_PAGE_OPTIONS,
		pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
	};
	public queryParameters: any = {
		...this.config.paging,
		organizationId: null,
		organization: null,
		keyWord: null,
		employeeId: null,
		employee: null,
		startDate: null,
		endDate: null,
		numberOfDays: null,
		typeOfLeaveId: null,
		salaryPercentage: null,
		reasonForLeave: null,
		note: null,
		status: null,
		sortBy: null,
		orderBy: null,
	};

	//flag
	displayColumnsCustom: boolean = false;
    displayDeleteDialog = false; // Kiểm soát hiển thị dialog
    selectedLeaveId?: number;
    selectedLeaveName?: string;

	constructor(
		private leaveApplicationService: LeaveApplicationService,
		private router: Router,
		private datePipe: DatePipe,
		private organiStructTypeService: OrganiStructTypeService,
		private route: ActivatedRoute,
		private employeeService: EmployeeService,
		private authService: AuthService,
		private messageService: MessageService,
		private shiftWorkService: ShiftWorkService,
		private checkinCheckoutService: CheckinCheckoutService,
		private fb: FormBuilder,
	) {
		this.authService.userCurrent.subscribe((user) => {
			this.user = user;
		});
	}

	@ViewChild(ConfirmDialogComponent)
	confirmDialogComponent!: ConfirmDialogComponent;

	ngOnInit(): void {
		this.breadcrumbs = [
			{
				label: 'Danh sách đơn xin nghỉ',
				routeLink: '/leave-application',
			},
			{ label: 'Duyệt đơn' },
		];
		this.statuses = [
			{ label: 'Chọn trạng thái', value: null },
			{ label: 'Đã duyệt', value: LeaveApplicationStatus.Approved },
			{ label: 'Chờ duyệt', value: LeaveApplicationStatus.Pending },
			{ label: 'Từ chối', value: LeaveApplicationStatus.Rejected },
		];
		const savedColumns = localStorage.getItem(
			'selectedColumnsLeaveApplication'
		);
		if (savedColumns) {
			const savedSettings = JSON.parse(savedColumns);
			this.columns.forEach((col) => {
				col.selected = !!savedSettings.find(
					(savedCol) => savedCol.field === col.field
				);
			});
		}

		this.checkInForm = this.fb.group({
			approverId: [null, Validators.required],
			date: [null, Validators.required],
			time: [null, Validators.required],
			timeCheckIn: [null, Validators.required],
			timeCheckOut: [null, Validators.required],
			checkType: [[]],
			shiftWorkId: [null, Validators.required],
			reason: [null, Validators.required],
			description: [null, Validators.required],
		});

		//get data
		this.getEmployees();
		this.getOrganizations();
		this.loadEmployees();
		this.getAllShiftWork();
		this.route.queryParams.subscribe((params) => {
			const request = {
				...params,
				pageIndex: params['pageIndex']
					? params['pageIndex']
					: this.config.paging.pageIndex,
				pageSize: params['pageSize']
					? params['pageSize']
					: this.config.paging.pageSize,
			};
			this.queryParameters = {
				...params,
				organizationId: this.queryParameters.organization?.data || null,
				keyWord: this.queryParameters.keyWord
					? this.queryParameters.keyWord.trim()
					: null,
				employeeId:
					this.queryParameters.employee?.id ||
					this.queryParameters.employeeId ||
					null,
				startDate: this.queryParameters.startDate || null,
				endDate: this.queryParameters.endDate || null,
				numberOfDays: this.queryParameters.numberOfDays || null,
				typeOfLeaveId: this.queryParameters.typeOfLeaveId || null,
				salaryPercentage: this.queryParameters.salaryPercentage || null,
				reasonForLeave: this.queryParameters.reasonForLeave
					? this.queryParameters.reasonForLeave.trim()
					: null,
				note: this.queryParameters.note
					? this.queryParameters.note.trim()
					: null,
				status:
					this.queryParameters.status != null
						? this.queryParameters.status
						: null,
				sortBy: this.queryParameters.sortBy || null,
				orderBy: this.queryParameters.orderBy || null,
			};
			this.getLeaveApplications(request);
		});
	}

	showDialog() {
		this.displayDialog = true;
	}

	loadEmployees(): void {
		const request: any = {
			pageSize: this.pageSize,
			pageIndex: this.pageIndex,
		};
		this.employeeService.getEmployees(request).subscribe((data) => {
			this.employeess = data.items.map((employee: any) => ({
				id: employee.id,
				name: `${employee.lastName} ${employee.firstName}`,
				employeeCode: employee.employeeCode,
				organizationId: employee.organization.id || '',
				positionName: employee.staffPosition?.positionName,
			}));

			this.units = [
				...new Set(
					data.items
						.map((employee: any) => ({
							id: employee.organization.id || '',
							name:
								employee.organization.organizationName ||
								'Không xác định',
						}))
						.filter((unit) => unit.id)
				),
			];

			this.represenSigning = data.items
				.filter((employee: any) => employee.workingStatus === 0)
				.map((employee: any) => ({
					id: employee.id,
					name: `${employee.lastName} ${employee.firstName}`,
					employeeCode: employee.employeeCode,
					organizationId: employee.organization.id || '',
					positionName: employee.staffPosition?.positionName,
				}));
		});
	}

	getAllShiftWork(): void {
		const request: any = {
			pageSize: this.pageSize,
			pageIndex: this.pageIndex,
		};
		this.shiftWorkService.getPaging(request).subscribe(
			(shiftWork: any) => {
				this.shiftWorks = shiftWork.data.items;
			},
			(error) => {
				console.error('Error fetching categories:', error);
			}
		);
	}

	onCheckTypeChange(event: any, checkValue: string) {
		let selectedTypes = this.checkInForm.get('checkType')?.value || [];

		if (event.checked) {
			// Nếu checkbox được chọn, thêm giá trị vào mảng
			selectedTypes.push(checkValue);
		} else {
			// Nếu bỏ chọn, loại bỏ giá trị khỏi mảng
			selectedTypes = selectedTypes.filter((item: string) => item !== checkValue);
		}

		// Cập nhật FormControl
		this.checkInForm.get('checkType')?.setValue(selectedTypes);

		// Cập nhật hiển thị
		this.showCheckIn = selectedTypes.includes('checkIn');
		this.showCheckOut = selectedTypes.includes('checkOut');
	}


	submitForm() {

		// Xác định giá trị checkType
		let selectedTypes = this.checkInForm.value.checkType;
		let checkTypeValue = 0;
		if (selectedTypes.includes('checkIn') && selectedTypes.includes('checkOut')) {
			checkTypeValue = 2;
		} else if (selectedTypes.includes('checkOut')) {
			checkTypeValue = 1;
		} else {
			checkTypeValue = 0;
		}

		// Chuyển đổi thời gian từ Date sang string HH:mm
		const formatTime = (date: Date | null) => {
			return date ? date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '';
		};

		const formatDate = (date: Date | null) => {
			return date ? date.toISOString().split('T')[0] : ''; // Cách 1: Dùng toISOString
			// return date ? date.toLocaleDateString('en-CA') : ''; // Cách 2: Dùng toLocaleDateString
		};

		// Chuẩn bị dữ liệu gửi lên API
		const request = {
			employeeId: this.user.employee.id,
			approverId: this.checkInForm.value.approverId,
			date: formatDate(this.checkInForm.value.date),
			timeCheckIn: formatTime(this.checkInForm.value.timeCheckIn),
			timeCheckOut: formatTime(this.checkInForm.value.timeCheckOut),
			checkType: checkTypeValue,
			shiftWorkId: this.checkInForm.value.shiftWorkId,
			reason: this.checkInForm.value.reason,
			description: this.checkInForm.value.description
		};

		// Gửi request POST
		this.checkinCheckoutService.create(request).subscribe(
			(response) => {
				console.log('Gửi thành công:', response);
				this.messages = [
                    {
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Lưu thông tin thành công',
                        life: 3000,
                    },
                ];
			},
			(error) => {
				console.error('Lỗi khi gửi:', error);
				this.messages = [
                    {
                        severity: 'error',
                        summary: 'Thất bại',
                        detail: 'Đã có lỗi xảy ra',
                        life: 3000,
                    },
                ];
			}
		);
	}

	toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
    }

    insertEmoji(emoji: string) {
        const textarea = document.getElementById("descriptionBox") as HTMLTextAreaElement;
        textarea.value += emoji;
        this.showEmojiPicker = false; // Đóng popup sau khi chọn emoji
    }

	//get data

	public getLeaveApplications(request: any): any {
		this.leaveApplicationService
			.paging(request)
			.subscribe((result: any) => {
				if (result.status) {
					if (
						request.pageIndex !== 1 &&
						result.data.items.length === 0
					) {
						this.route.queryParams.subscribe((params) => {
							const request = {
								...params,
								pageIndex: 1,
							};

							this.router.navigate([], {
								relativeTo: this.route,
								queryParams: request,
								queryParamsHandling: 'merge',
							});
						});
					}
					this.leaveApplications = result.data.items.map(
						(item: any) => {
							let statusLabel = '';
							switch (item.status) {
								case LeaveApplicationStatus.Pending:
									statusLabel = 'Đang chờ duyệt';
									break;
								case LeaveApplicationStatus.Approved:
									statusLabel = 'Đã được phê duyệt';
									break;
								case LeaveApplicationStatus.Rejected:
									statusLabel = 'Bị từ chối';
									break;
							}
							const formattedStartDate = this.datePipe.transform(
								item.startDate,
								'dd-MM-yyyy'
							);
							const formattedEndDate = this.datePipe.transform(
								item.endDate,
								'dd-MM-yyyy'
							);
							const formattedCreatedAt = this.datePipe.transform(
								item.createdAt,
								'dd-MM-yyyy'
							);

							return {
								...item,
								statusLabel,
								startDate: formattedStartDate,
								endDate: formattedEndDate,
								createdAt: formattedCreatedAt,
							};
						}
					);
					if (this.leaveApplications.length === 0) {
						this.paging.pageIndex = 1;
					}

					const { items, ...paging } = result.data;
					this.paging = paging;

					this.selectedLeaveApplications = [];
				}
			});
	}

	getOrganizations() {
		const request = { id: this.user.organization.id };;
		this.organiStructTypeService
			.getOrganiStructType(request.id)
			.subscribe((res) => {
				if (res && res.data) {
					this.organizations = [this.handleConvertToTree(res.data)];
				} else {
					this.organizations = [];
				}

				this.handleConvertToTreeSelect();
				this.route.queryParams.subscribe((params) => {
					const organizationId = params['organizationId']
						? params['organizationId']
						: null;
					if (organizationId) {
						this.queryParameters.organization =
							this.getOrganization(
								this.organizations,
								organizationId
							);
					}
				});
			});
	}
	getOrganization(nodes: any, id: any) {
		for (const node of nodes) {
			if (node.data == id) {
				return node;
			}
			if (node.children && node.children.length > 0) {
				const found = this.getOrganization(node.children, id);
				if (found) {
					return found;
				}
			}
		}
		return null;
	}

	getEmployees(keyWord: any = null) {
		const request = {
			pageIndex: 1,
			pageSize: 20,
			organizationId: this.user.organization.id,
			keyWord: keyWord,
		};
		this.employeeService.paging(request).subscribe((res) => {
			this.employees = res.items.map((data) => {
				const fullName = data.lastName + ' ' + data.firstName;
				return {
					...data,
					fullName: fullName,
					displayLabel: `${fullName} - ${data.accountEmail}`,
				};
			});
			this.route.queryParams.subscribe((params) => {
				const employeeId = params['employeeId']
					? params['employeeId']
					: null;
				if (employeeId) {
					this.queryParameters.employeeId = employeeId;
					this.getEmployee(employeeId);
				}
			});
		});
	}

	getEmployee(employeeId: any) {
		this.employeeService.getById({ id: employeeId }).subscribe((res) => {
			this.queryParameters.employee = res;
			const fullName = res.lastName + ' ' + res.firstName;
			const displayLabel = `${fullName} - ${res.accountEmail}`;
			this.queryParameters.employee.fullName = fullName;
			this.queryParameters.employee.displayLabel = displayLabel;
		});
	}

	//search data
	onSearch() {
		this.route.queryParams.subscribe((params) => {
			const request = {
				...params,
				organizationId: this.queryParameters.organization?.data || null,
				keyWord: this.queryParameters.keyWord
					? this.queryParameters.keyWord.trim()
					: null,
				employeeId:
					this.queryParameters.employee?.id ||
					this.queryParameters.employeeId ||
					null,
				startDate: this.queryParameters.startDate || null,
				endDate: this.queryParameters.endDate || null,
				numberOfDays: this.queryParameters.numberOfDays || null,
				typeOfLeaveId: this.queryParameters.typeOfLeaveId || null,
				salaryPercentage: this.queryParameters.salaryPercentage || null,
				reasonForLeave: this.queryParameters.reasonForLeave
					? this.queryParameters.reasonForLeave.trim()
					: null,
				note: this.queryParameters.note
					? this.queryParameters.note.trim()
					: null,
				status:
					this.queryParameters.status != null
						? this.queryParameters.status
						: null,
				sortBy: this.queryParameters.sortBy || null,
				orderBy: this.queryParameters.orderBy || null,
			};

			this.router.navigate([], {
				relativeTo: this.route,
				queryParams: request,
				queryParamsHandling: 'merge',
			});
		});
	}

	onRefreshSearch() {
		this.route.queryParams.subscribe((params) => {
			const request = {
				...params,
				organizationId: null,
				keyWord: null,
				employeeId: null,
				startDate: null,
				endDate: null,
				numberOfDays: null,
				typeOfLeaveId: null,
				salaryPercentage: null,
				reasonForLeave: null,
				note: null,
				status: null,
				sortBy: null,
				orderBy: null,
			};

			this.router.navigate([], {
				relativeTo: this.route,
				queryParams: request,
				queryParamsHandling: 'merge',
			});
		});
	}

	onAdd() {
		this.router.navigate(['/leave-application/create']);
	}

	onChangeOrganization(event: any) {
		// console.log('hi');
	}

	onPageChange(event: any) {
		this.paging.pageIndex = event.page + 1;
		this.paging.pageSize = event.rows;
		this.route.queryParams.subscribe((params) => {
			const request = {
				...params,
				pageIndex: event.page + 1,
				pageSize: event.rows,
			};

			this.router.navigate([], {
				relativeTo: this.route,
				queryParams: request,
				queryParamsHandling: 'merge',
			});
		});
	}

	onEmployeeSearch(event: any): void {
		// this.getEmployees();
		const keyWord = event.query.toLowerCase();
		this.getEmployees(keyWord);
	}
	onEmployeeSearchClear() {
		this.queryParameters.employee = null;
		this.queryParameters.employeeId = null;
	}

	//handle update

	handleUpdateStatus(leaveApplication: any, status: any) {
		const employeeName =
			'|' +
			leaveApplication.employee.lastName +
			' ' +
			leaveApplication.employee.firstName +
			'|';
		this.dialogMessage = `Bạn có muốn ${status === this.leaveApplicationStatus.Approved
			? 'duyệt'
			: 'từ chối'
			} đơn xin nghỉ của nhân viên ${employeeName} không?`;
		const params = {
			id: leaveApplication.id,
		};
		const request = {
			status: status,
			updateDaysRemainingTypeOfLeaveEmployeeRequest: {
				daysRemaining: leaveApplication.numberOfDays,
				employeeId: leaveApplication.employeeId,
				typeOfLeaveId: leaveApplication.typeOfLeaveId,
				year: this.extractYear(leaveApplication.startDate),
			},
		};
		this.confirmDialogComponent.showDialog(() => {
			this.leaveApplicationService
				.updateStatus(params, request)
				.subscribe((res) => {
					if (res.status == true) {
						this.messageService.add({
							severity: 'success',
							summary: 'Thành công',
							detail: res.message,
						});
						this.leaveApplications.find(
							(lea) => lea.id == leaveApplication.id
						).status = status;
					}
				});
		});
	}
	handleUpdateStatusMultiple(status: any) {
		let employeeName = '';
		const request = [];
		this.selectedLeaveApplications.forEach((leaveApp) => {
			if (leaveApp.status == this.leaveApplicationStatus.Pending) {
				employeeName +=
					'|' +
					leaveApp.employee.lastName +
					' ' +
					leaveApp.employee.firstName +
					'|';
				const requestObject = {
					id: leaveApp.id,
					status: status,
					approverNote: leaveApp.approverNote,
					updateDaysRemainingTypeOfLeaveEmployeeRequest: {
						daysRemaining: leaveApp.numberOfDays,
						employeeId: leaveApp.employeeId,
						typeOfLeaveId: leaveApp.typeOfLeaveId,
						year: this.extractYear(leaveApp.startDate),
					},
				};
				request.push(requestObject);
			}
		});
		this.dialogMessage = `Bạn có muốn ${status === this.leaveApplicationStatus.Approved
			? 'duyệt'
			: 'từ chối'
			} các đơn xin nghỉ của các nhân viên ${employeeName}  không?`;
		this.confirmDialogComponent.showDialog(() => {
			this.leaveApplicationService
				.updateStatusMultiple({
					updateStatusLeaveApplicationRequests: request,
				})
				.subscribe((res) => {
					if (res.status == true) {
						this.messageService.add({
							severity: 'success',
							summary: 'Thành công',
							detail: res.message,
						});
						this.leaveApplications.forEach((leaveApp) => {
							if (
								leaveApp.status ==
								this.leaveApplicationStatus.Pending
							) {
								leaveApp.status = status;
							}
						});
					}
				});
			this.selectedLeaveApplications = [];
		});
	}

	//handle delete
	handleDelete(leaveApplication: any) {
		this.messageService.add({
			severity: 'info',
			summary: 'Thông báo',
			detail: 'Tính năng này hiện không được hỗ trợ',
		});
	}

	//  function convert
	handleConcatenatePropertyValues(
		items: any[],
		propertyName1: string
	): string {
		if (!items || items.length === 0) {
			return '';
		}
		return items
			.map((item) => item[propertyName1])
			.filter((value) => value)
			.join(', ');
	}
	handleConvertToTree(node: any): any {
		if (!node.id) {
			console.log('node không có id:', node);
		}
		return {
			label: node.organizationName,
			data: node.id,
			children: (node.organizationChildren || []).map((child: any) =>
				this.handleConvertToTree(child)
			),
		};
	}

	handleMapToTreeNode(node: any): any {
		return {
			label: node.label,
			data: node.data,
			children: node.children || [],
		};
	}

	handleConvertToTreeSelect() {
		if (Array.isArray(this.organizations)) {
			this.organizations = this.organizations.map((organization) =>
				this.handleMapToTreeNode(organization)
			);
		} else {
			console.error(
				'organizations không phải là mảng',
				this.organizations
			);
		}
	}

	//function extract
	extractYear(dateString) {
		const regex = /\d{2}-(\d{2})-(\d{4})/;
		const match = dateString.match(regex);
		if (match) {
			return match[2];
		}
		return null;
	}
	//function compare
	isApprover(leaveApp: any) {
		return leaveApp.leaveApplicationApprovers.map(item => item.approverId).includes(this.user.employee.id);
	}

	//data front end
	columns = [
		{ field: 'employeeName', header: 'Người nộp đơn', selected: true },
		{
			field: 'affiliatedDocument',
			header: 'Đơn vị công tác',
			selected: false,
		},
		{ field: 'createdAt', header: 'Ngày nộp đơn', selected: false },
		{ field: 'startDate', header: 'Từ ngày', selected: true },
		{ field: 'endDate', header: 'Đến ngày', selected: true },
		{ field: 'numberOfDays', header: 'Số ngày nghỉ', selected: true },
		{ field: 'typeOfLeave', header: 'Loại nghỉ', selected: true },
		{
			field: 'salaryPercentage',
			header: 'Tỷ lệ hưởng lương',
			selected: false,
		},
		{
			field: 'accumulatedDays',
			header: 'Số ngày đã tích lũy',
			selected: false,
		},
		{
			field: 'leaveDaysEntitlement',
			header: 'Số ngày phép đã nghỉ',
			selected: false,
		},
		{
			field: 'leaveDaysRemaining',
			header: 'Số ngày phép còn lại',
			selected: false,
		},
		{ field: 'reasonForLeave', header: 'Lý do nghỉ', selected: false },
		{ field: 'approver', header: 'Người duyệt', selected: true },
		{ field: 'substitute', header: 'Người thay thế', selected: false },
		{ field: 'relatedPerson', header: 'Người liên quan', selected: false },
		{ field: 'note', header: 'Ghi chú', selected: false },
		{ field: 'status', header: 'Trạng thái', selected: true },
		{ field: 'position', header: 'Vị trí công việc', selected: false },
		{ field: 'action', header: 'Hành động', selected: true },
	];

	filteredColumns = [...this.columns];

	handleOpenDialogSelectedColumns() {
		this.displayColumnsCustom = true;
	}

	onSearchColumn(event: Event) {
		const query = (event.target as HTMLInputElement).value.toLowerCase();
		this.filteredColumns = this.columns.filter((col) =>
			col.header.toLowerCase().includes(query)
		);
	}

	handleApplyChangeSelectedColumns() {
		const selectedColumnsLeaveApplication = this.columns.filter(
			(col) => col.selected
		);
		localStorage.setItem(
			'selectedColumnsLeaveApplication',
			JSON.stringify(selectedColumnsLeaveApplication)
		);
		this.displayColumnsCustom = false;
	}

	getLeaveApplicationStatus(status: LeaveApplicationStatus): {
		text: string;
		color: string;
		bgColor: string;
	} {
		switch (status) {
			case LeaveApplicationStatus.Rejected:
				return {
					text: 'Bị từ chối',
					color: '#721c24', // màu đỏ đậm
					bgColor: '#f8d7da', // màu đỏ nhạt
				};
			case LeaveApplicationStatus.Pending:
				return {
					text: 'Chờ xác nhận',
					color: '#856404', // màu cam nâu
					bgColor: '#fff3cd', // màu cam nhạt
				};
			case LeaveApplicationStatus.Approved:
				return {
					text: 'Được chấp nhận',
					color: '#155724', // màu xanh lá đậm
					bgColor: '#d4edda', // màu xanh lá nhạt
				};
		}
	}
    confirmDelete(id: number, name: string) {
        this.selectedLeaveId = id;
        //this.selectedLeaveName = name;
        this.displayDeleteDialog = true;
      }

      // Xóa đơn nghỉ
      deleteLeave() {
        if (this.selectedLeaveId !== undefined) {
          this.leaveApplicationService.deleteLeaveApplication(this.selectedLeaveId).subscribe({
            next: (response) => {
              this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa đơn xin nghỉ thành công!' });
              this.leaveApplications = this.leaveApplications.filter(l => l.id !== this.selectedLeaveId);
              this.displayDeleteDialog = false;
            },
            error: (err) => {
              this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Xóa đơn nghỉ thất bại!' });
              console.error(err);
            }
          });
        }
      }

      // Đóng dialog mà không xóa
      cancelDelete() {
        this.displayDeleteDialog = false;
      }
}

//ignore
// onRefreshSearch() {
// 	this.router.navigate([], {
// 		relativeTo: this.route,
// 		queryParams: null,
// 		queryParamsHandling: '',
// 	});
// }
