const mockWE = {
    headers: ["小组编号", "选题"],
    items: [
        "FUND-WE-1;基金",
        "FUND-WE-2;基金",
        "TRA-WE-1;游迹",
        "TRA-WE-2;游迹",
        "PAP-WE-1;论文解读",
        "FREE-WE-1;自选（计组）",
        "ARS-WE-1;活动发布",
        "ARS-WE-2;活动发布",
    ]
}

const mockFR = {
    headers: ["小组编号", "选题"],
    items: [
        "FUND-FR-1;基金",
        "FUND-FR-2;基金",
        "TRA-FR-1;游迹",
        "TRA-FR-2;游迹",
        "PAP-FR-1;论文解读",
        "PAP-FR-2;论文解读",
        "ARS-FR-1;活动发布",
        "ARS-FR-2;活动发布",
    ]
}

export default {
    keys: ["WE", "FR"],
    data: {
        WE: mockWE,
        FR: mockFR,
    }
}