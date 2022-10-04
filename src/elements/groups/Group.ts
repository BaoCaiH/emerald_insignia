class Group {
  name: string;
  holder?: any[];
  constructor(name: string, instances?: any[]) {
    this.name = name;
    this.holder = instances;
  }
}

export default Group;
