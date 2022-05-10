export abstract class ViewContract<TDomainEntity, TResponseView> {
  /**
   * Converte uma entidade de domínio da aplicação para um formato de retorno externo.
   *
   * @param {TDomainEntity} entity
   * @param {boolean} detailedView
   */
  abstract render(entity: TDomainEntity, detailedView?: boolean): TResponseView

  /**
   * Converte uma lista de entidades de domínio da aplicação para um formato de retorno externo.
   *
   * @param {TDomainEntity[]} entities
   * @param {boolean} detailedView
   */
  public renderMany(entities: TDomainEntity[], detailedView?: boolean): TResponseView[] {
    return entities.map(entity => this.render(entity, detailedView))
  }
}
