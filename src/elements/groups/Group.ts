class Group {
  internalName: string;
  protected holder: any[];
  constructor(name: string, instances?: any[]) {
    this.internalName = name;
    this.holder = instances || [];
  }

  get name() {
    return this.internalName;
  }
}

export default Group;
