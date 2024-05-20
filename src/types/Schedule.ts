export interface MemberSchedule {
  "id": string,
  "member_id": string,
  "content": string,
  "holiday_work_start": Date,
  "holiday_work_finish": Date,
  "return_date": Date,
  "return_time": string,
  "display_return": string,
  "direct_return": string,
  "remark": any
}

export interface Schedule {
  "id": string,
  "order_id": string,
  "member": string,
  "schedules": MemberSchedule[]
}