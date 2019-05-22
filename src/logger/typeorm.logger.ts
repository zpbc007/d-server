import { Logger as LoggerType, QueryRunner } from 'typeorm'
import { LoggerOptions } from 'typeorm/logger/LoggerOptions'
import { Logger } from '@nestjs/common'

export class TypeormLogger implements LoggerType {
    private readonly context = 'Typeorm'
    constructor(private options?: LoggerOptions) {}

    /**
     * Logs query and parameters used in it.
     */
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        if (
            this.options === 'all' ||
            this.options === true ||
            (this.options instanceof Array && this.options.indexOf('query') !== -1)
        ) {
            Logger.log(this.getSql(query, parameters), this.context)
        }
    }

    /**
     * Logs query that is failed.
     */
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        if (
            this.options === 'all' ||
            this.options === true ||
            (this.options instanceof Array && this.options.indexOf('error') !== -1)
        ) {
            Logger.error(
                `
                query failed:
                    ${this.getSql(query, parameters)}
                error:
                    ${error}
            `,
                this.context,
            )
        }
    }

    /**
     * Logs query that is slow.
     */
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        Logger.warn(
            `
            query is slow:
                ${this.getSql(query, parameters)}
            execution time:
                ${time}
        `,
            this.context,
        )
    }

    /**
     * Logs events from the schema build process.
     */
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        if (
            this.options === 'all' ||
            (this.options instanceof Array && this.options.indexOf('schema') !== -1)
        ) {
            Logger.log(message, this.context)
        }
    }

    /**
     * Logs events from the migration run process.
     */
    logMigration(message: string, queryRunner?: QueryRunner) {
        Logger.log(message, this.context)
    }

    /**
     * Perform logging using given logger, or by default to the console.
     * Log has its own level and message.
     */
    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
        switch (level) {
            case 'log':
                if (
                    this.options === 'all' ||
                    (this.options instanceof Array && this.options.indexOf('log') !== -1)
                ) {
                    Logger.log(message, this.context)
                }
                break
            case 'info':
                if (
                    this.options === 'all' ||
                    (this.options instanceof Array && this.options.indexOf('info') !== -1)
                ) {
                    Logger.log(message, this.context)
                }
                break
            case 'warn':
                if (
                    this.options === 'all' ||
                    (this.options instanceof Array && this.options.indexOf('warn') !== -1)
                ) {
                    Logger.warn(message, this.context)
                }
                break
        }
    }

    protected stringifyParams(parameters: any[]) {
        try {
            return JSON.stringify(parameters)
        } catch (error) {
            // most probably circular objects in parameters
            return parameters
        }
    }

    private getSql(query: string, parameters?: any[]) {
        const paramsString =
            parameters &&
            parameters.length &&
            `params:
    ${this.stringifyParams(parameters)}`
        return `
query:
    ${query}
${paramsString ? paramsString : ''}`
    }
}
