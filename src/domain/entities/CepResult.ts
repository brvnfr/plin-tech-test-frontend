
export class CepResult {
    constructor(private props: CepApiResponse) { }

    get cep() {
        return this.props.cep;
    }

    get street() {
        return this.props.logradouro;
    }

    get complement() {
        return this.props.complemento ?? 'Não informado';
    }

    get neighborhood() {
        return this.props.bairro ?? 'Não informado';
    }

    get city() {
        return this.props.localidade;
    }

    get state() {
        return this.props.uf;
    }

    get region() {
        return this.props.regiao;
    }

    get ibge() {
        return this.props.ibge;
    }

    get ddd() {
        return this.props.ddd;
    }

    get gia() {
        return this.props.gia ?? 'Não informado';
    }

    get siafi() {
        return this.props.siafi;
    }
}
